const registroClient = require("../clients/registroClient")
const returnResponse = require("../helpers/returnResponse");
const bcrypt = require("bcryptjs");

class registroSupport {
    async validar(data) {
        const client = await registroClient.buscar(data.email);

        if (client.status != 200) {
            return returnResponse(400, true, "Erro. E-mail ou senha incorretos.");
        }

        const registro = client.data[0];

        if ((await bcrypt.compare(data.senha, registro.senha))) {
            return returnResponse(200, false, "Validação concluída com êxito.", registro);
        } else {
            return returnResponse(400, true, "Erro. E-mail ou senha incorretos.");
        }
    }
}

module.exports = new registroSupport;