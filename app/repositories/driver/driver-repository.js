const uuid = require('uuid/v4');
var Driver = require('./driver-model');

function DriverRepository() {
}

function getDriverData(id) {
  return { id: id };
}

function createDriver(driver, db) {
  var driverModel = Driver(db);
  return db.sync()
    .then(() => driverModel.create({
      name: driver.name,
      id: uuid()
    }));
}

DriverRepository.prototype = {
    getDriverData: getDriverData,
    createDriver : createDriver
};

var driverRepository = new DriverRepository();

module.exports = driverRepository;
