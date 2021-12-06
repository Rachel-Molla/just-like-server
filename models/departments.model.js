const dal = require("../data-access-layer/dal");

// constructor
const Department = function(department) {
  this.department_id = department.department_id;
  this.task_manager_id = department.task_manager_id;
  this.department_type = department.department_type;
  this.creation_date = department.creation_date;
};


Department.createAsync = async (department) => {

  const query = "INSERT INTO departments(department_id, task_manager_id, department_type, creation_date) VALUES(DEFAULT, ?, ?, NOW())";
  const info = await dal.executeAsync(query, [department.task_manager_id, department.department_type]);
  return department;

};


Department.getAll = async () => {

  let query = "SELECT * FROM departments";
  const departments = await dal.executeAsync(query);
  return departments;

};


Department.findById = async (department_id) => {

  let query = `SELECT * FROM departments WHERE department_id = ?`;
  const department = await dal.executeAsync(query, department_id);
  return department;

};


Department.updateById = async (department_id, updateDepartment) => {
  
  let query = "UPDATE departments SET task_manager_id = ?, department_type = ? WHERE department_id = ?";
  const department = await dal.executeAsync(query, [updateDepartment.task_manager_id, updateDepartment.department_type, department_id]);

  return department;

};

Department.remove = async (department_id) => {

  let query = "DELETE FROM departments WHERE department_id = ?";
  const department = await dal.executeAsync(query, department_id);
  return department;

};

Department.removeAll = async() => {

  let query = "DELETE FROM departments";
  const departments = await dal.executeAsync(query);
  return departments;

};

module.exports = Department;
