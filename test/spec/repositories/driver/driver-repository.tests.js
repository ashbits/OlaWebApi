
describe('DriverRepository Tests', function() {

  var driverRepository;

  beforeEach(function() {
    driverRepository = require('../../../../app/repositories/driver/driver-repository');
  });

  describe('getDriverData()', function() {

    it('should be a function', function(done) {
      expect(driverRepository.getDriverData).to.be.a('function');
      done();
    });

  });
});
