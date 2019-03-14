const Sequelize = require('sequelize');

function driverMeta() {
    return {
        name: Sequelize.STRING,
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        }
    };
}

module.exports = driverMeta;