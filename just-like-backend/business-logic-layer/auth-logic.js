const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const uuid = require("uuid");
const jwtHelper = require("../helpers/jwt-helper");

async function registerAsync(user) {

    // Hash password: 
    user.password = cryptoHelper.hash(user.password);

    // Create uuid:
    user.uuid = uuid.v4();

    const sql = "INSERT INTO just_like_accounts VALUES(DEFAULT, ?, ?, ?, ?, ?,DEFAULT)";
    const info = await dal.executeAsync(sql, [user.uuid, user.firstName, user.lastName, user.linkedin, user.password]);

    // Delete password so it wont return to the frontend:
    delete user.password;

    // Generate new token:
    user.token = jwtHelper.getNewToken(user);

    return user;
}

async function loginAsync(credentials) {

    credentials.password = cryptoHelper.hash(credentials.password);

    const sql = `SELECT uuid, firstName, lastName, username , isAdmin FROM users WHERE username = ? AND password = ?`;
    const users = await dal.executeAsync(sql, [credentials.username, credentials.password]);
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