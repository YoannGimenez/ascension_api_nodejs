const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');


const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
},);

User.prototype.checkPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};
console.log(User === sequelize.models.User);

module.exports = User;
