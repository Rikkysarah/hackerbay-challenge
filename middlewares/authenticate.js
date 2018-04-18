'use strict';

const express = require('express');
let app = express();
const jwt = require('jsonwebtoken');


const config = require('../config');
app.set('this1N@keY', config.secret);


module.exports = (req, res, next) => {
  
  const token = req.body.token || req.query.token || req.headers['token'];

  if (token) {
    
    jwt.verify(token, app.get('this1N@keY'), (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Incorrect Token. Authenticaion Failed.'
        });
      } else {
        // if things are good, save the dedoded in the req object and call next()
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    return res.status(400).send({
      success: false,
      message: 'No token provided.'
    });
  }
};
