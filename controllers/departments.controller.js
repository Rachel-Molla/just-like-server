const Department = require("../models/departments.model");

const errorsHelper = require("../helpers/errors-helper");

// Create and Save a new Department
exports.create = async (request, response) => {

  // Validate request
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Create a Department 
  const department = new Department({
    department_id: request.body.department_id,
    task_manager_id: request.body.task_manager_id,
    department_type: request.body.department_type,
    creation_date: request.body.creation_date
  });

  try {
    const addDepartment = await Department.createAsync(department);
    response.status(201).json(addDepartment);
  }
  catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }

};
  
// Retrieve all Departments from the database 
exports.getAll = async (request, response) => {

  try {
    const allDepartments = await Department.getAll();
    response.status(201).json(allDepartments);
  }
  catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }

};
  
// Find a single Department with department id
exports.findOne = async (request, response) => {

  try {
    const department = await Department.findById(request.params.department_id);
    if (!department) return response.status(401).send(`Not found department with id ${request.params.department_id}`);
    response.status(201).json(department);
  }
  catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }

};


// Update a Department identified by the department_id in the request
exports.updateOne = async (request, response) => {

  if (!request.body) return response.status(400).send("Content can not be empty!");
  
  try {
    const department = await Department.updateById(request.params.department_id, request.body);
    if (!department) return response.status(401).send(`Not found department with id ${request.params.department_id}`);
    response.status(201).json(department);
  }
  catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }

};

// Delete a Department with the specified department_id in the request
exports.deleteOne = async (request, response) => {

  try {
    const department = await Department.remove(request.params.department_id);
    if (!department) return response.status(401).send(`Not found department with id ${request.params.department}`);
    response.status(201).json(department);
  }
  catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }

};

// Delete all Departments from the database.
exports.deleteAll = async (request, response) => {

  try {
    const departments = await Department.removeAll();
    if (!departments) return response.status(401).send("Some error occurred while removing all departments.");
    response.status(201).json(departments);
  }
  catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }

};
