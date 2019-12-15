const redis = require('redis');
const useRedis = (process.env.USE_REDIS === 'true');

const client = useRedis ? redis.createClient() : null;

if (client) {
    client.on('connect', function () {
        console.log("### Redis Connected ###")
    });

    client.on('error', function (err) {
        console.error('### Redis Connected Failed : ' + err);
        process.exit();
    });
}

const del = (key) => {
    if (useRedis)
        client.del(key);
};

module.exports = {
    client,
    del
};
