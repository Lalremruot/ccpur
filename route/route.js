const express = require('express');
const { newuser, login, existingUser } = require('../controller/login-signup');
const newapps = require('../controller/applicationform');

const userRouter = express.Router();

// Register a new user
userRouter.post("/register", newuser);

//Register an existing student
userRouter.post("/exist-register", existingUser);

// Login a user
userRouter.post("/login", login);

// Application form
userRouter.post("/newapps", newapps)


module.exports = userRouter;