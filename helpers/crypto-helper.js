const crypto = require("crypto");

//hash strings

function hash(plainText) {

    if(!plainText) return null;

    const salt = "JustLike";
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

module.exports = {
    hash
};