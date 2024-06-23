const localCacheService = require("./localCacheService")

class cacheServiceWrapper {
    async see() {
        return localCacheService.see();
    }
    async save(token, requisition) {
        return localCacheService.save(token, requisition);
    }

    async get(token) {
        return localCacheService.get(token);
    }

    async exists(token) {
        return localCacheService.exists(token);
    }
}

module.exports = new cacheServiceWrapper;