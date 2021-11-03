var express = require('express');
var router = express.Router();

const api = require('../db-api/users');

router.post('/', function(req,res){
  let {firstName, lastName, linkedin, phone, permission, interest, specialization, email, password} = req.body; 
  api.sendUser(firstName, lastName, linkedin, phone, permission, interest, specialization, email, password)
  .then(response=>{
    res.status(200).json({msg:"succsess"})
  })
})

module.exports = router;