var sequelize = require('../../config/db-config');

function RiderService() {
  this.riderRepository = require('../../repositories/rider/rider-repository');
}

function lookupRider(id) {
  return {
    id: id
  };
}

function createRider(data) {
  var self = this;
  return self.riderRepository.createRider(data, sequelize);
}

RiderService.prototype = {
  lookupRider: lookupRider,
  createRider : createRider
};

var riderService = new RiderService();

module.exports = riderService;