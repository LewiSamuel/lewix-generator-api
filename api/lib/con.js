const Sequelize = require("sequelize");
require('dotenv/config');

// Conexao com o BD
// const sequelize = new Sequelize(process.env.URL_CON_DB);

// DEVELOPMENT CONNECTION DB
if(process.env.NODE_ENV == 'development'){
  var sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite'
  });

// PRODUCTION CONNECTION DB
}else if(process.env.NODE_ENV == 'production'){
  var sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite'
  });
}

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}