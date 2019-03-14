
function DriverController() {
  this.driverService = require('../../../services/driver/driver-service');
}

function post(req, res, next) {
  var self = this;
  self.driverService.createDriver(req.body)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).json(err);
  });
}

DriverController.prototype = {
  post: post
};

var driverController = new DriverController();

module.exports = driverController;
