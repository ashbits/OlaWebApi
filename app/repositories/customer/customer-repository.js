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
      id : uuid()
    }));
}

CustomerRepository.prototype = {
  getCustomerData: getCustomerData,
  createCustomer: createCustomer
};

var customerRepository = new CustomerRepository();

module.exports = customerRepository;