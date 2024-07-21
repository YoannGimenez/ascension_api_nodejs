const User = require('../models/User');
const UserProgress = require('../models/UserProgress')

const userController = {
    getUserProgress: async (req, res) => {
        try {
            const userId = req.params.userId;
            const userProgress = await UserProgress.findOne({ user_id: userId })

            if (!userProgress) {
                return res.status(404).json({
                    message: 'User progress not found',
                    status: 404
                });
            }

            res.json(userProgress);

        } catch (err) {
            res.status(500).json({
                message : err.message,
                status : 500
            });
        }
    },
}

module.exports = userController;




