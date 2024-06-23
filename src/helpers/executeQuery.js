const connection = require("../infrastructure/connection");

const executeQuery = async (sql, parametros = "") => {
    return new Promise((resolve, reject) => {
        connection.query(sql, parametros, (error, response) => {
            if (error) {
                return reject(error);
            }

            return resolve(response);
        });
    });
}

module.exports = executeQuery;