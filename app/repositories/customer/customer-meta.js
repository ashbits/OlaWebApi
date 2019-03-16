const Sequelize = require('sequelize');

var customerMeta = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
    },
    customerId: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
    }
};

module.exports = customerMeta;