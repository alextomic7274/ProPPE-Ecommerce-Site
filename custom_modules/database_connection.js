// Import an instance of mysql
const mysql = require('mysql');

// Create connection to database based on database credentials entered by calling function
function getDatabaseConnection(host, user, password, database) {
    const connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });
    return connection;
}
// Export DB connection function
module.exports = getDatabaseConnection;