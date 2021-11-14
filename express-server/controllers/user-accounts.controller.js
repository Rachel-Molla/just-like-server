const UserAccount = require("../models/user-accounts.model");

// Create and Save a new UserAccount
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a UserAccount
  const user_account = new UserAccount({
    password: req.body.password,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    linkedin_profile: req.body.linkedin_profile,
    permission_level: req.body.permission_level,
    areas_of_interest: req.body.areas_of_interest,
    area_of_specialization: req.body.area_of_specialization,
    registration_date: req.body.registration_date
  });

  // Save UserAccount in the database
  UserAccount.create(user_account, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the UserAccount."
      });
    else res.send(data);
  });

};
  
// Retrieve all UserAccount from the database 
exports.findAll = (req, res) => {
  UserAccount.getAll(req, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving UserAccounts."
      });
    else res.send(data);
  });
};
  
// Find a single UserAccount with a id
exports.findOne = (req, res) => {
  UserAccount.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found UserAccount with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving UserAccount with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a UserAccount identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  UserAccount.updateById( req.params.id, new UserAccount(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found UserAccount with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating UserAccount with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Delete a UserAccount with the specified id in the request
exports.delete = (req, res) => {
  UserAccount.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found UserAccount with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete UserAccount with id " + req.params.id
        });
      }
    } else res.send({ message: `UserAccount was deleted successfully!` });
  });
};

// Delete all UserAccounts from the database.
exports.deleteAll = (req, res) => {
  UserAccount.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all UserAccounts."
      });
    else res.send({ message: `All UserAccounts were deleted successfully!` });
  });
};