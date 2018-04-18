module.exports = {
    port: process.env.PORT || 4000,
    mongoose: {
    options: {
        useMongoClient: true,
        socketTimeoutMS: 0,
        keepAlive: true,
        reconnectTries: 30
    },
        Promise: require('bluebird'), //mongoose promise library
        connection: 'mongodb://hackerbay:hacker1234@ds149309.mlab.com:49309/hackerbay'        
    },
    jwt: {
        secret: 'this1N@keY', //secret key for jwt auth
        options: {
            expiresIn: '10 days'
        },
    },
    messages: {
        EMAIL_NOT_UNIQUE: 'Email is not unique',
        NO_DATA: 'Not enough data!',
        INVALID_CREDENTIALS: 'Wrong email or password!',
        INVALID_TOKEN: 'Invalid token!',
        NO_TOKEN_PROVIDED: 'You are not authenticated!',
    }
};
