const router = require("../routers");
const database = require("../infrastructure/database");

module.exports = async (app, express) => {
  await router(app, express);
  await database.init();
};