
describe('CustomerRepository Tests', function() {

  var customerRepository;

  beforeEach(function() {
    customerRepository = require('../../../../app/repositories/circus/customer-repository');
  });

  describe('getCustomerData()', function() {

    it('should be a function', function(done) {
      expect(customerRepository.getCustomerData).to.be.a('function');
      done();
    });

  });
});
