const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const jwtMw = require('../middleware/jwt');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
