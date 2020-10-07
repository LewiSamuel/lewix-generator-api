const db = require("../lib/con");

const User = db.sequelize.define('User',{
    Nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    PhotoImg: {
        type: db.Sequelize.TEXT
    },
    Email: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    Senha: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    Telefone: {
        type: db.Sequelize.STRING
    }
});

User.sync();

module.exports = User;