const express = require('express');

// register a new user
export const register = async (req, res) => {
    try {
      return res.status(200).json({
        message: "User registered successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
  
  // login a user
  export const login = async (req, res ) => {
    try {
      return res.status(200).json({
        message: "User logged in successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };