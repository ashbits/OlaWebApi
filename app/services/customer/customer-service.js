var sequelize = require('../../config/db-config');

function CustomerService() {
  this.customerRepository = require('../../repositories/customer/customer-repository');
}

function createCustomer(data) {
  var self = this;
  return self.customerRepository.createCustomer(data, sequelize);
}

CustomerService.prototype = {
  createCustomer: createCustomer
};

var customerService = new CustomerService();

module.exports = customerService;