let usersModel = require('../models/users.model');

function getAllUsers(req, res) {
    res.status(200).json(usersModel);
}

function changePassword(req, res) {
    /* 
        This destructured variable declartion is equivalent to this:

        const username = req.body.username
        const password = req.body.password 
    */
    const { email, password } = req.body; // Input from postman

    // constant variables to hold messages
    const USER_NOT_FOUND = 'User does not exist';
    const PASSWORD_IS_EMPTY = 'Password cannot be empty';
    const PASSWORD_UPDATED_MSG = username => `User ${username}'s password has been updated`;

    // finds the username that matches the username supplied from POSTMAN input.
    const user = usersModel.find(user => user.username === username);

    if (user && password) {
        user.password = password;
        return res.send(PASSWORD_UPDATED_MSG(username));
    } else {
        return !password ? res.send(PASSWORD_IS_EMPTY) : res.send(USER_NOT_FOUND);
    }
}

function addUser(req, res) {
    // destructured the body from the request
    const { email, password, firstName, lastName } = req.body;

    // error handler if fields are empty or invalid
    if (!email || !password || !firstName || !lastName) { // NaN = not a number 
       return res.status(400).json({
            error: 'Please fill out the complete information.'
       });
    }

    usersModel.push({ email, password, firstName, lastName });
    res.send(`User ${email} successfully registered!`);
}


function login(req, res) {
    const { email, password } = req.body;

    const user = usersModel.find((user) => user.email === email && user.password === password);

    if (user) {
        res.status(200).json({
            status: true,
            message: 'Login Successful'
        });
    } else {
        res.status(200).json({
            status: false,
            message: 'Login failed, wrong credentials'
        })
    }
}


module.exports = {
    getAllUsers,
    changePassword,
    addUser,
    login
};