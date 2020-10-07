const db = require("../lib/con");

const Post = db.sequelize.define('Post',{
    PhotoUrl: {
        type: db.Sequelize.STRING(400)
    },
    Descricao: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    idUser: {
        type: db.Sequelize.INTEGER
    }
});

Post.sync();

module.exports = Post;