const Sequelize = require('sequelize');

function riderMeta() {
    return {
        name: Sequelize.STRING,
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        }
    };
}

module.exports = riderMeta;