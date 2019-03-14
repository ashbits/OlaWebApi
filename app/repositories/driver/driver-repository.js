const uuid = require('uuid/v4');
var Driver = require('./driver-model');

function DriverRepository() {
}

function getDriverData(id) {
  return { id: id };
}

function createDriver(driver, db) {
  var driverModel = new Driver(db);
  return db.sync()
    .then(() => driverModel.create({
      name: driver.name,
      id: uuid()
    }))
    .then(result => {
      return result;
    });
}

DriverRepository.prototype = {
    getDriverData: getDriverData,
    createDriver : createDriver
};

var driverRepository = new DriverRepository();

module.exports = driverRepository;
