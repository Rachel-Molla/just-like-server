const mysql = require("mysql");

const connection = mysql.createPool({
    
    multipleStatements: true,

    host: config.mysql.host,

    user: config.mysql.user,

    password: config.mysql.password,

    database: config.mysql.name

});

function executeAsync(sql,values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values,(err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    executeAsync
};