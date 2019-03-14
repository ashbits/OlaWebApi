var riderMeta = require('./rider-meta');

function riderModel(db) {
    const rider = db.define('riders', riderMeta);
    return rider;
}

module.exports = riderModel;