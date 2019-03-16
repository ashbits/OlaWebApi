var Rider = require('./rider-model');
const _ = require('lodash'),
  Sequelize = require('sequelize'),
  Op = Sequelize.Op,
  globalConstants = require('../../config/const.json'),
  uuid = require('uuid/v4');

function RiderRepository() {}

function getAllRiders(db) {
  var riderModel = Rider(db);
  return riderModel.findAll();
}

function getDriverRiders(id, db) {
  var riderModel = Rider(db);
  return riderModel.findAll({
    where: {
      [Op.or]: [{
        driverId: id
      }, {
        rideStatus: globalConstants.rideStatus.wait
      }]
    }
  });
}

function createRider(rider, db) {
  var riderModel = Rider(db);
  return checkRiderStatus(riderModel, rider)
    .then((resultantRider) => {
      if (resultantRider) {
        return db.sync()
          .then(() => {
            return riderModel.create({
              requestId: uuid(),
              customerId: rider.customerId,
            });
          });
      }
      return Promise.reject({
        riderStatus: 'Customer is already riding'
      });
    });
}

function checkRiderStatus(riderModel, rider) {
  return riderModel.findOne({
      where: {
        rideStatus: globalConstants.rideStatus.completed,
        customerId: rider.customerId
      }
    })
    .catch(err => {
      if (err.parent.code === "ER_NO_SUCH_TABLE") {
        return true;
      } else {
        return Promise.reject(err);
      }
    });
}

function checkRiderAvailability(rider, db) {
  var riderModel = Rider(db);
  return riderModel.findOne({
    where: {
      rideStatus: globalConstants.rideStatus.wait,
      requestId: rider.requestId
    }
  });
}

function updateRiderStatus(data, rider) {
  return rider.update(data);
}

RiderRepository.prototype = {
  getAllRiders: getAllRiders,
  createRider: createRider,
  getDriverRiders: getDriverRiders,
  checkRiderAvailability: checkRiderAvailability,
  updateRiderStatus: updateRiderStatus
};

var riderRepository = new RiderRepository();

module.exports = riderRepository;