const express = require('express')
const router = express.Router();
const userController = require('../controllers/user.controller');
const jwtTokenMW = require('../middleware/jwt');

router.get('/progress/:userId', userController.getUserProgress)


module.exports = router;
