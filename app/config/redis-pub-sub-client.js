const redis = require('redis');
var pub, sub;
//.: Activate "notify-keyspace-events" for expired type events
pub = redis.createClient(process.env.REDIS_URL);
sub = redis.createClient(process.env.REDIS_URL);
pub.send_command('config', ['set', 'notify-keyspace-events', 'Ex'], SubscribeExpired);
//.: Subscribe to the "notify-keyspace-events" channel used for expired type events
function SubscribeExpired(e, r) {
    const expired_subKey = '__keyevent@0__:expired';
    sub.subscribe(expired_subKey, function () {
        console.log('Subscribed to "' + expired_subKey + '" event channel : ' + r);
    });
}

module.exports = {
    publisher: pub,
    subscriber :sub
};