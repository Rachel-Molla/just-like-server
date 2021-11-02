var express = require('express');
var router = express.Router();

const api = require('../db-api/users');

router.post('/', function(req,res){
  let {userName, firstName, lastName, linkedin, phone, email, password} = req.body; 
  api.sendUser(userName, firstName, lastName, linkedin, phone, email, password)
  .then(response=>{
    res.status(200).json({msg:"succsess"})
  })
})

module.exports = router;