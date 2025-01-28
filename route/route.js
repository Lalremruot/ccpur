 const express = require ("express");

const { register, login } = require('../controller/controller');

const userRouter = Router();

// Register a new user
userRouter.post("/register", register);

// Login a user
userRouter.post("/login", login);