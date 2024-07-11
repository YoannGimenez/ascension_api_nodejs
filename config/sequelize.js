const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.SQL_DATABASE_NAME, process.env.SQL_DATABASE_USER, process.env.SQL_DATABASE_PASSWORD, {
    host: process.env.SQL_DATABASE_HOST,
    dialect: 'postgres'
});


module.exports = sequelize;
