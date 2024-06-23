const registroModel = require("../models/registroModel");
const returnResponse = require("../helpers/returnResponse");

class registroClient {
    async listar() {
        const model = registroModel.listar();
        return model
            .then((registros) => {
                if (registros[0]) {
                    return returnResponse(200, false, "Registros listados com êxito.", registros);
                } else {
                    return returnResponse(202, false, "Nenhum registro existente.");
                }
            })
            .catch(() => { return returnResponse(400, true, "Erro interno.") });
    }

    async buscar(email) {
        const model = registroModel.buscar(email);
        return model
            .then((registro) => {
                if (registro[0]) {
                    return returnResponse(200, false, "Registro buscado com êxito.", registro);
                } else {
                    return returnResponse(404, true, "Registro inexistente.");
                }
            })
            .catch(() => { return returnResponse(400, true, "Erro interno.") });
    }

    async criar(data) {
        const model = registroModel.criar(data);
        return model
            .then(() => {
                return returnResponse(201, false, "Agente registrado com sucesso.");
            })
            .catch(() => {
                return returnResponse(400, true, "Erro interno.");
            });
    }

    async atualizar(data, email) {
        const atualizado = data;
        const model = registroModel.atualizar(atualizado, email);
        return model
            .then(() => {
                return returnResponse(200, false, "Registro modificado com êxito.");
            })
            .catch(() => {
                return returnResponse(400, true, "Erro interno.");
            });
    }

    async deletar(email) {        
        const model = registroModel.deletar(email);
        return model
            .then(() => {
                return returnResponse(200, false, "Registro deletado com êxito.");
            })
            .catch(() => {
                return returnResponse(400, true, "Erro interno.");
            });
    }
}

module.exports = new registroClient;