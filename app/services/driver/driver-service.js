var sequelize = require('../../config/db-config'),
  redisPublisher = require('../../config/redis-pub-sub-client').publisher;
redisSubScriber = require('../../config/redis-pub-sub-client').subscriber;

const _ = require('lodash'),
  Sequelize = require('sequelize'),
  globalConstants = require('../../config/const.json'),
  keyexpireTime = 300; //in seconds

function DriverService() {
  this.driverRepository = require('../../repositories/driver/driver-repository');
  this.riderRepository = require('../../repositories/rider/rider-repository');
}

function createDriver(driver) {
  var self = this;
  return self.driverRepository.createDriver(driver, sequelize);
}

function getDriverRiders(driverId) {
  var self = this;
  return self.riderRepository.getDriverRiders(driverId, sequelize);
}

function selectRider(data) {
  var self = this;
  return self.riderRepository.checkRiderAvailability(data, sequelize)
    .then(avilableRider => {
      if (avilableRider) {
        var updateParams = {
          rideStatus: globalConstants.rideStatus.ongoing,
          rideStartTime: Sequelize.literal('CURRENT_TIMESTAMP'),
          driverId: data.driverId
        };
        return self.riderRepository.updateRiderStatus(updateParams, avilableRider)
          .then((updatedRider) => {
            redisPublisher.set(`${data.requestId}_reqId`, updatedRider.customerId);
            redisPublisher.expire(`${data.requestId}_reqId`, keyexpireTime);
            return updateRideCompletionStatus.call(self, updatedRider);
          });
      }
      return {
        status: 'rider not available'
      };
    });
}

function updateRideCompletionStatus(rider) {
  var self = this;
  redisSubScriber.on('message', function (channel, msg) {
    var updateParams = {
      rideStatus: globalConstants.rideStatus.completed,
      rideEndTime: Sequelize.literal('CURRENT_TIMESTAMP'),
    };
    return self.riderRepository.updateRiderStatus(updateParams, rider);
  });
}

DriverService.prototype = {
  createDriver: createDriver,
  getDriverRiders: getDriverRiders,
  selectRider: selectRider
};

var driverService = new DriverService();

module.exports = driverService;