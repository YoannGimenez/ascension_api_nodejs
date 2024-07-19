const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const jwtMw = require('../middleware/jwt');

router.post('/', jwtMw(), postController.create);
router.get('/', postController.getLast10Posts);
router.get('/:id', postController.getPostById);

module.exports = router;
