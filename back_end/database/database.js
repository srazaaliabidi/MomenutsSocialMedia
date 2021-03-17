const mysql = require('mysql');

// come back to this later - ignore for prototype - will have to change file structure further for express
//  create pool of multiple connections so app doesn't get hung up with errors on one
const pool = mysql.createPool ({
    host:"localhost",
    user:"root",
    password:"password",
    database:"SocialMedia",
    connectionLimit: 500, 
    debug: false,
});

const promisePool = pool.promise();
module.exports = promisePool;