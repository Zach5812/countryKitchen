const express = require("express");
const UserController = require('../controllers/user.controller');
const { authenticate } = require("../configs/middleware.config");

const userRouter = express.Router();
userRouter.post('/', UserController.create);
userRouter.get('/', authenticate, UserController.allUser);
userRouter.delete('/:id', authenticate, UserController.delUser);

module.exports = { userRouter };