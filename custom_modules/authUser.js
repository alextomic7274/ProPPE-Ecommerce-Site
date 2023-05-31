// Array that stores user data
const users = [];

// Push user details to users array
function createUser(username, password){
    users.push({username, password});
}

// Check user details against array and return corresponding boolean
function checkUserCredentials(username, password){
    const user = users.find(user => user.username === username)

    if (!user || user.password !== password) {
        return false;
    }
    return true;
}

// Export the module functions
module.exports = {createUser, checkUserCredentials};
