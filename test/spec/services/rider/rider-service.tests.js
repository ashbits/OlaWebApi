
describe('RiderService Tests', function() {

  var riderService;

  beforeEach(function() {
    riderService = require('../../../../app/services/rider/rider-service');
  });

  describe('lookupRider', function() {

    it('should be a function', function(done) {
      expect(riderService.lookupRider).to.be.a('function');
      done();
    });

  });
});
