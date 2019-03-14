
describe('DriverService Tests', function() {

  var driverService;

  beforeEach(function() {
    driverService = require('../../../../app/services/driver/driver-service');
  });

  describe('lookupDriver', function() {

    it('should be a function', function(done) {
      expect(driverService.lookupDriver).to.be.a('function');
      done();
    });

  });
});
