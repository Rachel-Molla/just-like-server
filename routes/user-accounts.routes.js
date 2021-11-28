const user_accounts = require("../controllers/user-accounts.controller");

const express = require("express");
const router = express.Router();

router.get("/captcha", user_accounts.captcha);

router.get("/login", user_accounts.login);

// Create a new user account
router.post("/register", user_accounts.register);

// Retrieve all user accounts
router.get("/", user_accounts.getAll);

// Retrieve a single user account with uuid
router.get("/:uuid", user_accounts.findOne);

// Update a user account with uuid
router.put("/:uuid", user_accounts.updateOne);

// Delete a user account with uuid
router.delete("/:uuid", user_accounts.deleteOne);

// Delete all user accounts
router.delete("/", user_accounts.deleteAll);

module.exports = router;
