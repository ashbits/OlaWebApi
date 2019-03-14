var sequelize = require('../../config/db-config');

function DriverService() {
  this.driverRepository = require('../../repositories/driver/driver-repository');
}

function lookupDriver(id) {
  return {
    id: id
  };
}

function createDriver(data) {
  var self = this;
  return self.driverRepository.createDriver(data, sequelize);
}

DriverService.prototype = {
  lookupDriver: lookupDriver,
  createDriver: createDriver
};

var driverService = new DriverService();

module.exports = driverService;