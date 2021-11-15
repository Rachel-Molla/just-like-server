const UserAccount = require("../models/user-accounts.model");

const errorsHelper = require("../helpers/errors-helper");
const svgCaptcha = require("svg-captcha");
const cryptoHelper = require("../helpers/crypto-helper");
//const verifyCaptcha = require("../middleware/verify-captcha");

exports.captcha = (request, response) => {
  const captcha = svgCaptcha.create(); // Creates a new CAPTCHA image + text
  const image = captcha.data;
  const text = captcha.text;
  const hashedText = cryptoHelper.hash(text);
  response.cookie("text", hashedText); // cookie רק בגלל שאנו רוצים לקבל בחזרה את הטקסט - שלחנו אותו ע"י
  response.type("svg").send(image);
}

exports.login = async (request, response) => {
  try {
      const loggedInUser = await UserAccount.loginAsync(request.body);
      if (!loggedInUser) return response.status(401).send("Incorrect username or password.");
      response.json(loggedInUser);
  }
  catch (err) {
      response.status(500).send(errorsHelper.getError(err));
  }
};

// Create and Save a new UserAccount
exports.register = async (request, response) => {

  try {
    const addedUser = await UserAccount.registerAsync(request.body);
    response.status(201).json(addedUser);
  }
  catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }

  /*
  // Validate request
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!"
    });
  }


  // Create a UserAccount
  const user_account = new UserAccount({
    password: request.body.password,
    email: request.body.email,
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    phone_number: request.body.phone_number,
    linkedin_profile: request.body.linkedin_profile,
    permission_level: request.body.permission_level,
    areas_of_interest: request.body.areas_of_interest,
    area_of_specialization: request.body.area_of_specialization,
  });

  
  // Save UserAccount in the database
  UserAccount.create(user_account, (err, data) => {
    if (err)
      response.status(500).send({
        message:
          err.message || "Some error occurred while creating the UserAccount."
      });
    else response.send(data);
  });
  */

};
  
// Retrieve all UserAccount from the database 
exports.findAll = (request, response) => {
  UserAccount.getAll(request, (err, data) => {
    if (err)
    response.status(500).send({
        message:
          err.message || "Some error occurred while retrieving UserAccounts."
      });
    else response.send(data);
  });
};
  
// Find a single UserAccount with a id
exports.findOne = (request, response) => {
  UserAccount.findById(request.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `Not found UserAccount with id ${request.params.id}.`
        });
      } else {
        response.status(500).send({
          message: "Error retrieving UserAccount with id " + request.params.id
        });
      }
    } else response.send(data);
  });
};


// Update a UserAccount identified by the id in the request
exports.update = (request, response) => {
  // Validate Request
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(request.body);

  UserAccount.updateById( request.params.id, new UserAccount(request.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `Not found UserAccount with id ${request.params.id}.`
        });
      } else {
        response.status(500).send({
          message: "Error updating UserAccount with id " + request.params.id
        });
      }
    } else response.send(data);
  });
};

// Delete a UserAccount with the specified id in the request
exports.delete = (request, response) => {
  UserAccount.remove(request.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        response.status(404).send({
          message: `Not found UserAccount with id ${request.params.id}.`
        });
      } else {
        response.status(500).send({
          message: "Could not delete UserAccount with id " + request.params.id
        });
      }
    } else response.send({ message: `UserAccount was deleted successfully!` });
  });
};

// Delete all UserAccounts from the database.
exports.deleteAll = (request, response) => {
  UserAccount.removeAll((err, data) => {
    if (err)
      response.status(500).send({
        message:
          err.message || "Some error occurred while removing all UserAccounts."
      });
    else response.send({ message: `All UserAccounts were deleted successfully!` });
  });
};
