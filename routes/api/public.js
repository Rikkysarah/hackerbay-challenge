const publicRoutes = require('express').Router();
const userController = require('../../controllers/user');

publicRoutes.post('/register', userController.register);
publicRoutes.post('/login', userController.login);

module.exports = publicRoutes;