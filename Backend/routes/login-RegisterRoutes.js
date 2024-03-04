const express = require('express');
const router = express.Router();

// Define a single database to store user profiles
const userDB = [
    {
        firstname: "Bryan Dave",
        lastname: "Aguilar",
        username: "Bryan_15",
        email: "bryan@gmail.com",
        password: "bryan",
        consfirmPassword: "bryan"
    }
];


// Login validation endpoint
router.post('/login-validation/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    // Find the user in the userDB array
    const user = userDB.find((user) => {
        return user.username === username && user.password === password;
    });

    if (user) {
        // If user exists, return success response with user data
        res.status(200).json({
            code: "success",
            msg: "Username and Password matched a record",
            loginUser: user
        });
    } else {
        // If user does not exist, return error response
        res.status(401).json({
            code: "failed",
            msg: "Incorrect Username and Password"
        });
    }
});

const newUserDB = [

]

// Registration endpoint
router.post('/registration', (req, res) => {
    // Extract data from request body
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    // Generate an ID for the new user
    let id = newUserDB.length + 1;

    // Create a new user object
    const newUser = {
        id: id,
        username: email, // Assuming email is used as the username for login
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
    };

    // Push the new user object to the userDB array
    newUserDB.push(newUser);

    // Respond with a success message and the updated userDB array
    res.status(200).json({
        code: "success",
        msg: "Registration successful",
        regUser: newUserDB
    });
});

// read
router.get('/get-reguser-data', (req, res) => {
    res.json(newUserDB);  
 })

module.exports = router;
