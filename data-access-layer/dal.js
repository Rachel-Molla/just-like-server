const mysql = require("mysql");

const connection = mysql.createPool({
    
    multipleStatements: true,

    host: config.mysql.host,

    user: config.mysql.user,

    password: config.mysql.password,

    database: config.mysql.name

});


function executeAsync(query, values) {
    return new Promise((resolve, reject) => {
        connection.query(query, values,(err, result) => {
            if(err) return reject(err);
            console.log("MySQL connect successfully");
            resolve(result);
        });
    });
}

module.exports = {
    executeAsync
};