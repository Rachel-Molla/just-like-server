var express = require('express');
const crypto = require('crypto');

var router = express.Router();
const api = require('../db-api/users');

router.post('/', function(req,res){
  let {email, password} = req.body; 
  let hashedPassword = crypto.pbkdf2Sync(password, "strongrealtor", 1000, 64, 'sha512')
  .toString('base64');
  api.sendUser(2, email, hashedPassword)
  .then(response=>{
    res.status(200).json({msg:"succsess"})
  })
})

module.exports = router;