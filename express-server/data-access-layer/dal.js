const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
    
    multipleStatements: true,

    host: config.mysql.host,

    user: config.mysql.user,

    password: config.mysql.password,

    database: config.mysql.name

});


// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});
  
module.exports = connection;

/*
function executeAsync(sql,values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values,(err, result) => {
            if(err) return reject(err);
            console.log("MySQL connect successfully");
            resolve(result);
        });
    });
}

module.exports = {
    executeAsync
};

*/