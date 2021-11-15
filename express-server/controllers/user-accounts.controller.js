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
      if (!loggedInUser) return response.status(401).send("Incorrect email or password.");
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

};
  
// Retrieve all UserAccount from the database 
exports.findAll = async (request, response) => {

  try {
    const allUsers = await UserAccount.getAll();
    response.status(201).json(allUsers);
  }
  catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }

};
  
// Find a single UserAccount with a id
exports.findOne = async (request, response) => {

  try {
    const user = await UserAccount.findById(request.params.id);
    if (!user) return response.status(401).send(`Not found UserAccount with id ${request.params.id}`);
    response.status(201).json(user);
  }
  catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }

};


// Update a UserAccount identified by the id in the request
exports.update = async (request, response) => {

  if (!request.body) return response.status(400).send("Content can not be empty!");
  console.log(request.body);

  try {
    const user = await UserAccount.updateById(request.params.id, new UserAccount(request.body));
    if (!user) return response.status(401).send(`Not found UserAccount with id ${request.params.id}`);
    response.status(201).json(user);
  }
  catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }

};

// Delete a UserAccount with the specified id in the request
exports.delete = async (request, response) => {

  try {
    const user = await UserAccount.remove(request.params.id);
    if (!user) return response.status(401).send(`Not found UserAccount with id ${request.params.id}`);
    response.status(201).json(user);
  }
  catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }

};

// Delete all UserAccounts from the database.
exports.deleteAll = async (request, response) => {

  try {
    const users = await UserAccount.removeAll();
    if (!users) return response.status(401).send("Some error occurred while removing all UserAccounts.");
    response.status(201).json(users);
  }
  catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }

};
