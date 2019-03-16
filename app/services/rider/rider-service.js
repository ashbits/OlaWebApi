var sequelize = require('../../config/db-config');

function RiderService() {
  this.riderRepository = require('../../repositories/rider/rider-repository');
}

function createRider(data) {
  var self = this;
  return self.riderRepository.createRider(data, sequelize);
}

function getAllRiders() {
  var self = this;
  return self.riderRepository.getAllRiders(sequelize);
}

RiderService.prototype = {
  createRider: createRider,
  getAllRiders: getAllRiders
};

var riderService = new RiderService();

module.exports = riderService;