const uuid = require('uuid/v4');
var Driver = require('./driver-model');

function DriverRepository() {
}

function getDriverData(id) {
  return { id: id };
}

function createDriver(driver, db) {
  var driverModel = Driver(db);
  console.log(driver)
  return db.sync()
    .then(() => driverModel.create({
      driverId: driver.driverId,
      id: uuid()
    }));
}

DriverRepository.prototype = {
    getDriverData: getDriverData,
    createDriver : createDriver
};

var driverRepository = new DriverRepository();

module.exports = driverRepository;
