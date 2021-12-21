const Sequelize  = require("sequelize");
const Connection = require("../Schema/connection");

const UsersModel = Connection.define('ApostasModel', {
    UserID: {
      type: Sequelize.STRING,
      allowNull: true
    },
    apostaId: {
      type: Sequelize.STRING,
      allowNull: true
    },
    ApostasConcluidas: {
      type: Sequelize.STRING,
      allowNull: true
    },

});

UsersModel.sync({force: false}).then(() => {});
module.exports = UsersModel;