
function CustomerController() {
  this.customerService = require('../../../services/customer/customer-service');
}

function post(req, res, next) {
  var self = this;
  self.customerService.createCustomer(req.body)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).json(err);
  });
}

CustomerController.prototype = {
  post: post
};

var customerController = new CustomerController();

module.exports = customerController;
