const express = require('express')
const router = express.Router();
const userController = require('../controllers/user.controller');
const jwtTokenMW = require('../middleware/jwt');

router.get('/', jwtTokenMW(), userController.findAll)


module.exports = router;
