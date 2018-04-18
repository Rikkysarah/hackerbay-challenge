const config = require('../../config');
const _ = require('lodash');

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//POST
module.exports.register = (req, res) => {
    let {firstName, lastName, email, password} = req.body;

    if ((req.body === '')) res.json({success: false, message: config.messages.NO_DATA});
    else {

        const user = new User({
            firstName,
            lastName,
            email,
            password
            
        });

        User.isEmailUnique(email)
            .then(
                () => user.save(),
                () => {
                    res.json({success: false, message: config.messages.EMAIL_NOT_UNIQUE})
                }
            )
            .then(() => {
                res.json({success: true});
                console.log(`User '${firstName} ${lastName}' registered!`);
            })
            .catch(error => {
                console.error(error);
                res.json({success: false})
            });
    }
};

//POST
module.exports.login = (req, res) => {
    let {email, password} = req.body;

    if ((req.body === '')) res.json({success: false, message: config.messages.NO_DATA});
    else
        User.findOne({email, password}, {password: 0})
            .exec()
            .then(user => {
                if (user) {
                    user = JSON.parse(JSON.stringify(user));
                    jwt.sign(user, config.jwt.secret, config.jwt.options, (err, token) => {
                        res.json({
                            success: true,
                            user,
                            token,
                        });
                    });
                } else {
                    res.json({success: false, message: config.messages.INVALID_CREDENTIALS});
                }
            })
            .catch(error => {
                console.error(error);
                res.json({success: false});
            });
};

//GET
module.exports.info = (req, res) => {
    /*
    We could use res.locals to serve the user data but when the data changes it will serve the old data from the JWT token
     */
    const user = res.locals.user;

    User.findById(user._id) //_id should remain the same
        .then(user => {
            console.log(`User '${user.firstName} ${user.lastName}' got info!`);
            res.json({success: true, user});
        })
        .catch(error => {
            console.error(error);
            res.json({success: false});
        });
};
