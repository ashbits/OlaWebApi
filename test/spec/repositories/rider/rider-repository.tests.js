
describe('RiderRepository Tests', function() {

  var riderRepository;

  beforeEach(function() {
    riderRepository = require('../../../../app/repositories/rider/rider-repository');
  });

  describe('getRiderData()', function() {

    it('should be a function', function(done) {
      expect(riderRepository.getRiderData).to.be.a('function');
      done();
    });

  });
});
