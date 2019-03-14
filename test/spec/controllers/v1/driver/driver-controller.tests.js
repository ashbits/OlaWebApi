
describe('DriverController Tests', function() {

  var driverController;
  var req;
  var res;
  var next;

  beforeEach(function() {
    req = {};
    res = { status: function(code) { return { json: function(obj) {} }} };

    sinon.spy(res, "status");

    driverController = require('../../../../../app/controllers/v1/driver/driver-controller');
  });

  describe('post()', function() {

    it('should be a function', function(done) {
      expect(driverController.post).to.be.a('function');
      done();
    });

    it('should call res.status() one time', function(done) {
      driverController.post(req, res, next);

      expect(res.status.callCount).to.equal(1);
      done();
    });

    it('should call res.status() with 200', function(done) {
        driverController.post(req, res, next);

      expect(res.status.calledWith(200)).to.equal(true);
      done();
    });

  });
});
