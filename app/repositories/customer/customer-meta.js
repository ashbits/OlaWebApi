const Sequelize = require('sequelize');

function customerMeta() {
    return {
        name: Sequelize.STRING,
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        }
    };
}

module.exports = customerMeta;