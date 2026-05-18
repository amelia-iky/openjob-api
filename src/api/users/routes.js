const express = require('express');

const { addUserHandler, getUserByIdHandler } = require('./handler');

const validate = require('../../middleware/validate');
const UserSchema = require('../../validations/usersSchema');

const router = express.Router();

router.post('/users', validate(UserSchema), addUserHandler);

router.get('/users/:id', getUserByIdHandler);

module.exports = router;
