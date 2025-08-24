const User = require('../models/userModel');


async function findUserByEmailOrUsername(email,username) {
    return await User.findOne({$or:[{email},{username}]});
}


async function createUser({username,password,email}){
    const data = new User();
        data.username = username;
        data.password = password;
        data.email = email;
        return await data.save();
}


module.exports = {findUserByEmailOrUsername,createUser};

