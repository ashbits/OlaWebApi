const uuid = require('uuid/v4');
var Customer = require('./customer-model');

function CustomerRepository() {}

function getCustomerData(id) {
  return {
    id: id
  };
}

function createCustomer(customer, db) {
  var customerModel = new Customer(db);
  return db.sync()
    .then(() => customerModel.create({
      name: customer.name,
      id: uuid()
    }))
    .then(result => {
      return result;
    });
}

CustomerRepository.prototype = {
  getCustomerData: getCustomerData,
  createCustomer: createCustomer
};

var customerRepository = new CustomerRepository();

module.exports = customerRepository;