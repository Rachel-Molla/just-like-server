var express = require('express');
var router = express.Router();

const crypto = require('crypto');

const api = require('../db-api/users');


/* GET users listing. */
router.post('/', function(req, res, next) {
  const {email, password} = req.body;
  const token = crypto.pbkdf2Sync(password, 'strongrealtor', 1000, 64, 'sha512');
  const userPasswordHashed = token.toString('base64');
  api.getUser( email, userPasswordHashed)  
  .then(user =>{
    //If result is empty 
    if(!user){
      res.status(401).json({status: 401, error: 'Invalid email or password'});
    }else{
      //If we have a user
      // res.cookie('auth',{userId :user.id, role: user.type}, {maxAge: 1000 *60 *60 *24});
      res.status(200).json({msg:"succsess"});
    } } )
  .catch(error => res.status(500).json({error: error.message}));
});

module.exports = router;
