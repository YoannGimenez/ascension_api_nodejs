const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CharacterSchema = new schema({
    character_name: { type: String, required: true },
    run_count: { type: Number, default: 0 },
});

const AchievementSchema = new schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    reward: { type: String, required: true },
    unlocked: { type: Boolean, default: false },
});

const UserProgressSchema = new schema({
    user_id: { type: String, required: true },
    run_count: { type: Number, default: 0 },
    run_win_count: { type: Number, default: 0 },
    run_char_count: { type: [CharacterSchema], default: [] },
    achievements: { type: [AchievementSchema], default: [] },
});

const UserProgress = mongoose.model('user_progress', UserProgressSchema)

module.exports = UserProgress;
