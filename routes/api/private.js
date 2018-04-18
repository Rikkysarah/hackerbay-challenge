const privateRouter = require('express').Router();
const userController = require('../../controllers/user');

privateRouter.get('/', userController.info);

module.exports = privateRouter;