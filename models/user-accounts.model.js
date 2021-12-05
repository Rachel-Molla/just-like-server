const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const uuid = require("uuid");
const jwtHelper = require("../helpers/jwt-helper");

// constructor
const UserAccount = function(user) {
  this.uuid = user.uuid;
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


UserAccount.registerAsync = async (user) => {
  
  // Hash password: 
  user.password = cryptoHelper.hash(user.password);

  // Create uuid:
  user.uuid = uuid.v4();

  const query = "INSERT INTO user_accounts(uuid, password, email, first_name, last_name, phone_number, linkedin_profile, permission_level, areas_of_interest, area_of_specialization, registration_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW() )";
  const info = await dal.executeAsync(query, [user.uuid, user.password, user.email, user.first_name, user.last_name, user.phone_number, user.linkedin_profile, user.permission_level, user.areas_of_interest, user.area_of_specialization, user.registration_date]);

  // Delete password so it wont return to the frontend:
  delete user.password;

  // Generate new token:
  user.token = jwtHelper.getNewToken(user);
  
  return user;
};


UserAccount.loginAsync = async (credentials) => {

  credentials.password = cryptoHelper.hash(credentials.password);

  const query = `SELECT * FROM user_accounts WHERE email = ? AND password = ?`;
  const users = await dal.executeAsync(query, [credentials.email, credentials.password]);
  if (users.length === 0) return null;
  const user = users[0];

  // Generate new token:
  user.token = jwtHelper.getNewToken(user);

  return user;
}


UserAccount.getAll = async () => {
  let query = "SELECT * FROM user_accounts";
  const users = await dal.executeAsync(query);
  return users;
};


UserAccount.findById = async (uuid) => {
  let query = `SELECT * FROM user_accounts WHERE uuid = ?`;
  const user = await dal.executeAsync(query, uuid);
  return user;
};


UserAccount.updateById = async (uuid, updateUser) => {

  updateUser.password = cryptoHelper.hash(updateUser.password);
  
  let query = "UPDATE user_accounts SET password = ?, email = ?, first_name = ?, last_name = ?, phone_number = ?, linkedin_profile = ?, permission_level = ?, areas_of_interest = ?, area_of_specialization = ? WHERE uuid = ?";
  const user = await dal.executeAsync(query, [updateUser.password, updateUser.email, updateUser.first_name, updateUser.last_name, updateUser.phone_number, updateUser.linkedin_profile, updateUser.permission_level, updateUser.areas_of_interest, updateUser.area_of_specialization, uuid]);
  return user;

};

UserAccount.remove = async (uuid) => {
  let query = "DELETE FROM user_accounts WHERE uuid = ?";
  const user = await dal.executeAsync(query, uuid);
  return user;
};

UserAccount.removeAll = async() => {

  let query = "DELETE FROM user_accounts";
  const users = await dal.executeAsync(query);
  return users;

};

module.exports = UserAccount;
