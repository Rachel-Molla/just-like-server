const sql = require("../data-access-layer/dal");

// constructor
const UserAccount = function(user) {
  this.password = user.password;
  this.email = user.email;
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.phone_number = user.phone_number;
  this.linkedin_profile = user.linkedin_profile;
  this.permission_level = user.permission_level;
  this.areas_of_interest = user.areas_of_interest;
	this.area_of_specialization = user.area_of_specialization;
  this.registration_date = user.registration_date;
};

UserAccount.create = (newUser, result) => {
  sql.query("INSERT INTO user_accounts SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new user account: ", { uuid: res.insertId, ...newUser });
    result(null, { uuid: res.insertId, ...newUser });
  });
};

UserAccount.findById = (id, result) => {
  sql.query(`SELECT * FROM user_accounts WHERE uuid = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user account: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found UserAccount with the id
    result({ kind: "not_found" }, null);
  });
};

UserAccount.getAll = (result) => {
  let query = "SELECT * FROM user_accounts";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("user accounts: ", res);
    result(null, res);
  });
};

UserAccount.updateById = (id, newUser, result) => {
  sql.query(
    "UPDATE user_accounts SET email = ?, first_name = ?, last_name = ? WHERE uuid = ?",
    [newUser.email, newUser.first_name, newUser.last_name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found UserAccount with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user account: ", { id: id, ...newUser });
      result(null, { id: id, ...newUser });
    }
  );
};

UserAccount.remove = (id, result) => {
  sql.query("DELETE FROM user_accounts WHERE uuid = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found UserAccount with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user account with id: ", id);
    result(null, res);
  });
};

UserAccount.removeAll = result => {
  sql.query("DELETE FROM user_accounts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} user accounts`);
    result(null, res);
  });
};

module.exports = UserAccount;