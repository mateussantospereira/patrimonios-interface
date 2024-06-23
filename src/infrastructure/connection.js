const mysql = require("mysql");
const config = require("./config");

const connection = mysql.createConnection(config.connection());

module.exports = connection;