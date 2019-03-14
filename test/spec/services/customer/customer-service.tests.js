
describe('CustomerService Tests', function() {

  var customerService;

  beforeEach(function() {
    customerService = require('../../../../app/services/circus/customer-service');
  });

  describe('lookupCustomer', function() {

    it('should be a function', function(done) {
      expect(customerService.lookupCustomer).to.be.a('function');
      done();
    });

  });
});
