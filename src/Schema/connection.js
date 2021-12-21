const Sequelize = require('sequelize');

const Connection = new Sequelize('setfight', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = Connection;