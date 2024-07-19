const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const ROLE_ENUM = require('../enums/role.enum');
const Post = require("../models/Post");


const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Email is not usable."],
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        minLength: [8, "Password must be a minimum of 8 characters long."]
    },
    role: {
        type: DataTypes.ENUM(ROLE_ENUM.ROLE_USER, ROLE_ENUM.ROLE_DONATOR, ROLE_ENUM.ROLE_DEV, ROLE_ENUM.ROLE_MODERATOR, ROLE_ENUM.ROLE_ADMIN, ROLE_ENUM.ROLE_SUPERADMIN),
        defaultValue: ROLE_ENUM.ROLE_USER,
        allowNull: false,
    },
    banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
},);
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });

module.exports = User;
