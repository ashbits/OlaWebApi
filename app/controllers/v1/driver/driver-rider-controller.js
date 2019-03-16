var errors = require('throw.js');
var errorMessages = require('../../../config/error.config.json');

function DriverController() {
	this.driverService = require('../../../services/driver/driver-service');
}

function post(req, res) {
	var self = this;
	self.driverService.selectRider(req.body)
		.then(response => {
			res.status(200).json(response);
		})
		.catch(err => {
			res.status(500).json(err);
		});
}

function get(req, res) {
	var self = this;
	var id = req.params.id;
	if (!id) {
		return (new errors.BadRequest(errorMessages.DRIVER_ID_NOT_FOUND));
	}
	self.driverService.getDriverRiders(id)
		.then(response => {
			res.status(200).json(response);
		})
		.catch(err => {
			res.status(500).json(err);
		});
}

DriverController.prototype = {
	post: post,
	get: get
};

var driverController = new DriverController();

module.exports = driverController;