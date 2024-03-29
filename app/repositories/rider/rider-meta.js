const Sequelize = require('sequelize'),
globalConstants = require('../../config/const.json');

var riderMeta = {
    requestId: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
    },
    customerId: {
        allowNull: false,
        type: Sequelize.STRING
    },
    rideStatus : {
        allowNull : false,
        type : Sequelize.STRING,
        defaultValue : globalConstants.rideStatus.wait
    },
    driverId : {
        type : Sequelize.STRING
    },
    rideStartTime : {
        type : Sequelize.DATE
    },
    rideEndTime : {
        type : Sequelize.DATE
    }
};

module.exports = riderMeta;