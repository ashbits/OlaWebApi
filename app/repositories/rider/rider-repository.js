var Customer = require('../customer/customer-model');

function RiderRepository() {
}

function getRiderData(id) {
  return { id: id };
}

function createRider (rider, db) {
  var customerModel = new Customer(db);
  customerModel.findAll({
    where: {
      id: rider.userId
    }
  })
  .then(customer => {
    console.log(customer);
  });
}

RiderRepository.prototype = {
    getRiderData: getRiderData,
    createRider : createRider
};

var riderRepository = new RiderRepository();

module.exports = riderRepository;
