const cors = require("cors");
const { urlCors } = require("./url");
const Cors = cors({ origin: urlCors, methods: "GET,POST,PUT,DELETE" });

module.exports = { Cors };