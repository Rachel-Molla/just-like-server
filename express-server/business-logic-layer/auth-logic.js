const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const uuid = require("uuid");
const jwtHelper = require("../helpers/jwt-helper");

async function registerAsync(user) {

    // Hash password: 
    user.password = cryptoHelper.hash(user.password);

    // Create uuid:
    user.uuid = uuid.v4();

    const sql = "INSERT INTO user_accounts(email, first_name, last_name, phone_number, linkedin_profile, password) VALUES(?, ?, ?, ?, ?, ?)";
    const info = await dal.executeAsync(sql, [user.email, user.first_name, user.last_name, user.phone_number, user.linkedin_profile, user.password]);
    // Delete password so it wont return to the frontend:
    delete user.password;

    // Generate new token:
    user.token = jwtHelper.getNewToken(user);

    return user;
}

async function loginAsync(credentials) {

    credentials.password = cryptoHelper.hash(credentials.password);

    const sql = `SELECT * FROM user_accounts WHERE email = ? AND password = ?`;
    const users = await dal.executeAsync(sql, [credentials.email, credentials.password]);
    if (users.length === 0) return null;
    const user = users[0];

    // Generate new token:
    user.token = jwtHelper.getNewToken(user);

    return user;
}

module.exports = {
    registerAsync,
    loginAsync
};