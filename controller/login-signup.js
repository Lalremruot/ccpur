const express = require('express');
const pool = require('../db');
const bcrypt = require('bcryptjs');

// Register a new user
const newuser = async (req, res) => {
  try {
    // Get the user data from the request body
    const { name, email, password } = req.body;

    // Check if user data is provided
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide all user details",
      });
    }

    // Check if user already exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length > 0) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Increased the salt rounds to 10 for better security
    const hashedPassword = await bcrypt.hash(password, salt);

    // Execute SQL query to insert user into the database
    const query = 'INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *';
    const values = [name, email, hashedPassword];
    const result = await pool.query(query, values); 

    console.log('User Created:', result.rows[0]);

    // Send a success response with the newly created user data
    return res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0], // Assuming newUser.rows[0] contains the newly created user
    });

  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      message: "Internal Server Error",
    });
}};
  
//User registration : existing student
const existingUser = async(req, res) => {
  try {
    // get the user data from the request body
    const { name, email, phone_number, roll_number, semester, password } = req.body;
  
    // check if user data is provided
    if (!name || !email || !phone_number || !roll_number || !semester || !password) {
    return res.status(400).json({message: "Please provide all details"});
     }

   // check if user already exists
      const user = await pool.query("SELECT name, email, phone_number, roll_number, semester FROM users;");
  
    if (user.rows.length > 0) {
      return res.status(400).json({message: "User already exists"});
      }

    // hash the password
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, salt);

    // execute SQL query to insert user into the database
     const newUser = await pool.query('INSERT INTO users ( name, email, phone_number, roll_number,semester, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [ name, email, phone_number, roll_number,semester, password]);
     res.json(newUser[0]);
     
  } catch (error) {
    console.error(error.message)
  }
};



  // lOGIN A USER

  const login = async (req, res) => {
    try {
      // get the user data from the request body
      const { name, password } = req.body;
  
      // check if user data is provided
      if (!name || !password) {
        return res.status(400).json({
          message: "Please provide all user details",
        });
      }
  
      // check if user exists
      const user = await pool.query("SELECT * FROM users WHERE name = $1", [name]);
      if (user.rows.length === 0) {
        return res.status(400).json({
          message: "User does not exist",
        });
      }
  
      // compare the password
      const validPassword = await comparePassword(password, user.rows[0].password);
      if (!validPassword) {
        return res.status(400).json({
          message: "Invalid password",
        });
      }
  
      // If the email and password are valid, return user data
      return res.status(200).json({
        message: "User logged in successfully",
        user: {
          id: user.rows[0].id,
          username: user.rows[0].username,
          email: user.rows[0].email,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
  module.exports = {
    newuser,
    existingUser,
    login,
  };
