const Sequelize = require('sequelize');

var driverMeta = {
    driverId: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
    },
    id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
    }
}

module.exports = driverMeta;