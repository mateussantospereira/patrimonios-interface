const returnResponse = require("../helpers/returnResponse");

const CACHE = new Map();

class localCacheService {
    see() {
        return CACHE;
    }
    
    save(token, requisition) {
        try {
            if (!this.exists(token)) {
                let data = {};
                let expireTime = process.env.CACHE_TOKEN_EXPIRATION || 900000; 
                data[requisition] = Date.now();
                data["expire"] = Date.now() + Number(expireTime);

                CACHE.set(token, data);
                return returnResponse(201, false, "Requisição salva.");
            }

            let data = CACHE.get(token);
            data[requisition] = Date.now();
            CACHE.set(token, data);

            return returnResponse(201, false, "Requisição salva.");
        } catch (error) {
            return returnResponse(400, true, "Erro ao tentar salvar requisição.");
        }
    }

    get(token) {
        try {
            if (this.exists(token)) {
                let data = CACHE.get(token);
                return returnResponse(200, false, "Dados encontrados.", data);
            }

            return returnResponse(400, true, "Token inexistente.");
        } catch (error) {
            return returnResponse(400, true, "Erro ao tentar buscar token.");
        }
    }

    exists(token) {
        let exists = CACHE.has(token);
        if (exists && this.isExpired(token)) {
            this.remove(token);
            return false;
        }

        return exists;
    }

    isExpired(token) {
        let expire = CACHE.get(token).expire;
        return Date.now() > expire;
    }

    remove(token) {
        CACHE.delete(token);
    }

    removeExpiredKeys() {
        let expiredKeys = Array.from(CACHE.keys()).filter((key) => {
            return this.isExpired(key)
        });
        expiredKeys.forEach((key) => {
           this.remove(key);
        });
        console.log(`${expiredKeys.length} keys removeds.`)
    }
}

module.exports = new localCacheService;