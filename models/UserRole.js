const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const UserRole = sequelize.define('UserRole', {});

module.exports = UserRole;
