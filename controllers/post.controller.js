const Post = require("../models/Post");
const User = require("../models/User");
const FieldValidation = require('../middleware/fieldValidation');


const postController = {
    create: async (req, res) => {

        const fieldValidation = new FieldValidation();

        fieldValidation.textValidator('title', true, 3, 100, 'Title');

        const errors = await fieldValidation.validateRules(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array(), status: 422 });
        }

        try {
            const postData = req.body;
            let post = await Post.create(postData);
            res.status(201).json({post : post});

        } catch (err) {
            res.status(500).json({
                message : err.message,
                status : 500
            });
        }



    },
    getLast10Posts: async (req, res) => {
        try {
            const posts = await Post.findAll({
                limit: 10,
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: User,
                        as: 'author',
                        attributes: ['username'],
                    },
                ],
            });
            const formattedPosts = posts.map(post => ({
                id: post.id,
                title: post.title,
                content: post.content,
                createdAt: post.createdAt,
                author: post.author.username,
            }));
            res.status(201).json({posts : formattedPosts});
        } catch (err) {
            res.status(500).json({
                message : err.message,
                status : 500
            });
        }
    },
    getPostById: async (req, res) => {
        try {
            const post = await Post.findOne({
                where: { id: req.params.id },
                include: [
                    {
                        model: User,
                        as: 'author',
                        attributes: ['username'],
                    },
                ],
            });

            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            const formattedPost = {
                id: post.id,
                title: post.title,
                content: post.content,
                createdAt: post.createdAt,
                author: post.author.username,
            }

            res.status(200).json({post : formattedPost });

        } catch (err) {
            res.status(500).json({
                message : err.message,
                status : 500
            });
        }
    }
}


module.exports = postController;
