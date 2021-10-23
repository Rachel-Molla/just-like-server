const jwt = require("jsonwebtoken");

function verifyAdmin(req, res, next) {

    //"Bearer the-token"
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, config.jwtKey, (err, payload) => {

        //if user is not an admin:
        if (!payload.payload.isAdmin)
            return res.status(403).json("You are not an admin!");

        //user is admin:
        next();
    });
}


module.exports = verifyAdmin;