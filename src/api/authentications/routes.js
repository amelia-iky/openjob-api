const express = require('express');

const {
  loginHandler,
  refreshAuthenticationHandler,
  deleteAuthenticationHandler,
} = require('./handler');

const validate = require('../../middleware/validate');
const authenticateToken = require('../../middleware/auth');
const AuthSchema = require('../../validations/authSchema');

const router = express.Router();

router.post('/authentications', validate(AuthSchema), loginHandler);

router.put('/authentications', refreshAuthenticationHandler);

router.delete(
  '/authentications',
  authenticateToken,
  deleteAuthenticationHandler,
);

module.exports = router;
