
function RiderController() {
  this.riderService = require('../../../services/rider/rider-service');
}

function post(req, res, next) {
  var self = this;
  self.riderService.createRider(req.body)
  .then(response => {
    res.status(200).json(response);
  })
  .catch(err => {
    res.status(500).json(err);
  });
}

RiderController.prototype = {
  post: post
};

var riderController = new RiderController();

module.exports = riderController;
