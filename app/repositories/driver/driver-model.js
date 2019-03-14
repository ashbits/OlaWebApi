var driverMeta = require('./driver-meta');

function driverModel(db) {
    const driver = db.define('drivers', driverMeta);
    return driver;
}

module.exports = driverModel;