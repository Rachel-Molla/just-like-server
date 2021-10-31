global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const cookie = require("cookie-parser"); 
const expressRateLimit = require("express-rate-limit");
const sanitize = require("./middleware/sanitize");
const cors = require("cors");
const authController = require("./controllers-layer/auth-controller");
const nodemon = require("nodemon");


// create express app
const server = express();


// DOS Attack protection:
server.use("/api/", expressRateLimit({
    windowMs: 1000, // 1 second
    max: 10, // limit each IP to 5 requests per windowMs
    message: "Are You a Hacker?" 
}));

// Enable cookies: 
server.use(cookie());
//use express
server.use(express.json());

// XSS attack protection:
server.use(sanitize);
//enable access to the api from outside origins
server.use(cors());

server.use("/api/auth",authController);

// setup the server port 
const port = process.env.PORT || 3001;
//listen to the port
server.listen(port, () => console.log(`server is running at port ${port}`));