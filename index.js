require("dotenv").config();
const express = require("express");
const app = express();
const { PORT } = require("./src/config/url");
const config = require("./src/config/config");

config(app, express);

app.listen(PORT, (error) => {
    if (error) {
        return console.error(error);
    }

    return console.log(`Aplicação na porta ${PORT}`);
});
