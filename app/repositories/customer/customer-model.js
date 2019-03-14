var customerMeta = require('./customer-meta');

function customerModel(db) {
    const Customer = db.define('customers', customerMeta);
    return Customer;
}

module.exports = customerModel;