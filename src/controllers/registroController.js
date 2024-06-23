const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { response } = require("../helpers/response");
const { checkInputs } = require("../helpers/checkInputs");
const registroClient = require("../clients/registroClient");
const registroField = require("../fields/registroField");
const registroSupport = require("../supports/registroSupport");
const registroAssistence = require("../assistences/registroAssistence");

class registroController {
    async listar(req, res) {
        const response = await registroClient.listar();
        return res.status(response.status).json(response);
    }

    async buscar(req, res) {
        const { email } = req.params;
        const response = await registroClient.buscar(email);
        return res.status(response.status).json(response);
    }

    async validar(req, res) {
        const fields = await registroField.validar();
        let resultInputs = checkInputs(req.body, fields);
        let reqData = resultInputs.data;

        if (resultInputs.error == true) {
            return response(res, 400, true, resultInputs.message);
        }

        return validar(reqData);

        async function validar(data) {
            const support = await registroSupport.validar(data);

            if (support.status != 200) {
                return res.status(support.status).json(support);
            }

            await registroAssistence.createSession(req);
            const token = await registroAssistence.createToken(support.data);

            support.data = {
                nome: support.data.nome,
                email: support.data.email,
                token: token
            };

            return res.status(support.status).json(support);
        }
    }

    async verificar(req, res) {
        const token = req.body.token;

        try {
            const decode = await promisify(jwt.verify)(token, process.env.SECRET);
            response(res, 200, false, "Token válido", decode);
        } catch (error) {
            response(res, 400, true, "Token inválido");
        }
    }

    async criar(req, res) {
        const fields = await registroField.criar();
        let resultInputs = checkInputs(req.body, fields);
        let reqData = resultInputs.data;

        if (resultInputs.error == true) {
            return response(res, 400, true, resultInputs.message);
        }

        reqData.senha = await registroAssistence.createPassword(reqData.senha);
        return buscar(reqData.email);

        async function buscar(email) {
            const client = await registroClient.buscar(email);
            if (client.status == 200) {
                return response(res, 400, true, "Erro. Este E-mail já está em uso.");
            }

            return criar(reqData);
        }

        async function criar(data) {
            const response = await registroClient.criar(data);
            return res.status(response.status).json(response);
        }
    }

    async atualizar(req, res) {
        if (!req.body.novaSenha) {
            req.body.novaSenha = "";
        }

        const { email } = req.params;
        const fields = await registroField.atualizar();
        let resultInputs = checkInputs(req.body, fields);
        let reqData = resultInputs.data;

        if (resultInputs.error == true) {
            return response(res, 400, true, resultInputs.message);
        }

        const data = { email: email, senha: reqData.senha };
        const support = await registroSupport.validar(data);

        if (support.status != 200) {
            return res.status(support.status).json(support);
        }

        return atualizar(reqData);

        async function atualizar(registro) {
            if (registro.email != email) {
                const client = await registroClient.buscar(reqData.email);
                if (client.status == 200) {
                    return response(res, 400, true, "Erro. Este E-mail já está sendo ultilizado.");
                }
                return modificar();
            }
            return modificar();
        };

        async function modificar() {
            if (reqData.novaSenha != "") {
                reqData.senha = reqData.novaSenha;
            };

            reqData.senha = await registroAssistence.createPassword(reqData.senha);
            delete reqData.novaSenha;

            const client = await registroClient.atualizar(reqData, email);
            return res.status(client.status).json(client);
        };
    }

    async deletar(req, res) {
        const { email } = req.params;
        const client = await registroClient.deletar(email);
        return res.status(client.status).json(client);
    }

}

module.exports = new registroController;