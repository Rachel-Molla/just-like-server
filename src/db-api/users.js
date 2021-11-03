
const connection = require('../../data-access-layer/dal').connection;

function getUser(email, password) {
  return new Promise((resolve, reject) => {
      connection.query('select * from user_accounts where email=? and password=? ', [email, password], function (error, results) {
          if (error) {
              reject(error);
              return;
          }
          resolve(results);
      });
  });
}

function sendUser(firstName, lastName, linkedin, phone, permission, interest, specialization, email, password){
  return new Promise((resolve, reject)=>{
    connection.query('insert into user_accounts(first_name, last_name, linkedin_profile, phone_number, permission_level, areas_of_interest, area_of_specialization, email, password) values(?,?,?,?,?,?,?,?,?)', [firstName, lastName, linkedin, phone, permission, interest, specialization, email, password], (error, results) =>{
      if (error){
        reject(error);
        return;
      }
      resolve(results)
    })
  })
}

module.exports = {getUser, sendUser};