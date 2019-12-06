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

const getAsync = (key) => {
    return new Promise((resolve, reject) => {
        try {
            if (!useRedis)
                return resolve(null);

            client.get(key, (err, obj) => {
                if (err || !obj) {
                    console.error(`Redis getAsync key [${key}] | err: ${err}`);
                    resolve(null);
                } else {
                    resolve(obj);
                }

            })
        } catch (e) {
            console.error(`Redis getAsync key [${key}] | err: ${err}`);
            reject(null);
        }
    })
};

const getAsyncWithCallback = (key, callback) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!useRedis) {
                const value = await callback(key);
                return resolve(value);
            }

            client.get(key, async (err, obj) => {
                if (err) {
                    console.error(`Redis getAsyncWithCallback key [${key}] | err: ${err}`);
                    return resolve(null);
                }

                if (!obj) {
                    const value = await callback(key);
                    if (value) {
                        client.set(key, JSON.stringify(value));
                    }

                    resolve(value);
                } else {
                    resolve(JSON.parse(obj));
                }
            })
        } catch (e) {
            console.error(`Redis getAsyncWithCallback key [${key}] | err: ${e}`);
            resolve(null);
        }
    })
};

const del = (key) => {
    if (useRedis)
        client.del(key);
};

module.exports = {
    client,
    getAsync,
    getAsyncWithCallback,
    del
};
