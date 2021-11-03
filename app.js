global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
var path = require('path');
const cookie = require("cookie-parser"); 
const expressRateLimit = require("express-rate-limit");
const sanitize = require("./middleware/sanitize");
const cors = require("cors");
const authController = require("./controllers-layer/auth-controller");
const http = require('http');

// create express app
const server = express();
const httpServer = http.createServer(server);
const io = require('socket.io')(http);
const url = require("url");
const bodyParser = require('body-parser');

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

httpServer.listen(port, () => console.log(`HTTP server is running at port ${port}`));

