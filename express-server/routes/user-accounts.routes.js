const user_accounts = require("../controllers/user-accounts.controller");

var router = require("express").Router();

// Create a new user account
router.post("/", user_accounts.create);

// Retrieve all user accounts
router.get("/", user_accounts.findAll);

// Retrieve a single user account with id
router.get("/:id", user_accounts.findOne);

// Update a user account with id
router.put("/:id", user_accounts.update);

// Delete a user account with id
router.delete("/:id", user_accounts.delete);

// Delete all user accounts
router.delete("/", user_accounts.deleteAll);

module.exports = router;
