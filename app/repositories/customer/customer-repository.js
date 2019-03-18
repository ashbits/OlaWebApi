var Customer = require('./customer-model');
const uuid = require('uuid/v4');

function CustomerRepository() {}

function getCustomerData(id) {
  return {
    id: id
  };
}

function createCustomer(customer, db) {
  var customerModel = Customer(db);
  return db.sync()
    .then(() => customerModel.create({
      customerId: customer.customerId,
      id: uuid()
    }));
}

function checkCustomerExist(customer, db) {
  var customerModel = Customer(db);
  return customerModel.findOne({
    where: {
      customerId: customer.customerId
    }
  });
}

CustomerRepository.prototype = {
  getCustomerData: getCustomerData,
  createCustomer: createCustomer,
  checkCustomerExist: checkCustomerExist
};

var customerRepository = new CustomerRepository();

module.exports = customerRepository;