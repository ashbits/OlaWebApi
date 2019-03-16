const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
    operatorsAliases: false
});

module.exports = sequelize;