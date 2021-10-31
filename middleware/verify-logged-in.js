const jwt = require("jsonwebtoken");

function verifyLoggedIn(request, response, next) {

  
    if (!request.headers.authorization)
        return response.status(401).send("You are not logged in!");

    //"Bearer the-token(get the token from the string)"
    const token = request.headers.authorization.split(" ")[1];

    if (!token)
        return response.status(401).send("You are not logged in!");

    jwt.verify(token, config.jwtKey, (err, payload) => { 

        if (err && err.message === "jwt expired")
            return response.status(403).send("Your login session has expired.");

        if (err)
            return response.status(401).send("You are not logged in!");
            
        
        next();
    });
}

module.exports = verifyLoggedIn;
