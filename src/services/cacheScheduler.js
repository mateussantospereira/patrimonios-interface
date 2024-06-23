const schedule = require("node-schedule");
const localCacheService = require("./localCacheService");

let timeToClean = process.env.CACHE_CLEAR || "*/15 * * * *";

const removeExpiredKeys = () => {
    schedule.scheduleJob(timeToClean, () => {
        localCacheService.removeExpiredKeys();
    });
};

module.exports = removeExpiredKeys;