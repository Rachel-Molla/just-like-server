const departments = require("../controllers/departments.controller");

const express = require("express");
const router = express.Router();


// Create a new department
router.post("/new_department", departments.create);

// Retrieve all departments
router.get("/", departments.getAll);

// Retrieve a single department with id
router.get("/:department_id", departments.findOne);

// Update a department with id
router.put("/:department_id", departments.updateOne);

// Delete a department with id
router.delete("/:department_id", departments.deleteOne);

// Delete all departments
router.delete("/", departments.deleteAll);

module.exports = router;
