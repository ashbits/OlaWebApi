const Sequelize = require('sequelize');

var driverMeta = {
    name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
    }
}

module.exports = driverMeta;