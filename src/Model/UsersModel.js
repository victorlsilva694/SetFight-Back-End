const Sequelize  = require("sequelize");
const Connection = require("../Schema/connection");

const UsersModel = Connection.define('Users', {
    name:{
        type: Sequelize.STRING,
        allowNull: true
    },
    lastName:{
        type: Sequelize.STRING,
        allowNull: true
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: true
    },
    wins:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    loses: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

UsersModel.sync({force: false}).then(() => {});
module.exports = UsersModel;