const patrimonioClient = require("../clients/patrimonioClient");
const returnResponse = require("../helpers/returnResponse");
const { checkInputs } = require("../helpers/checkInputs");
const { url } = require("../config/url");

class patrimonioSupport {
    async valideXLSX(body, fields) {
        let list = [];
        let listaId = [];

        function error(message) {
            return returnResponse(400, true, message);
        }

        for (let line of body) {
            if (!line['ATIVO/BAIXA']) {
                line['ATIVO/BAIXA'] = "Ativo";
            }

            if (!line['OBS']) {
                line['OBS'] = "Não";
            }

            let resultInputs = checkInputs(line, fields);
            let reqData = resultInputs.data;

            if (resultInputs.error == true) {
                return error(resultInputs.message);
            }

            if (listaId.includes(reqData['NI'])) {
                return error("Erro. Este arquivo possuí números de inventário repetidos.");
            }

            const client = await patrimonioClient.buscar(reqData['NI']);

            if (client.status == 200) {
                return error("Erro. O arquivo possuí números de patrimônios já existentes.");
            }

            listaId.push(reqData['NI']);

            const newData = {
                ni: reqData['NI'],
                instituicao: reqData['INSTITUIÇÃO'],
                tag: reqData['TAG'],
                descricao: reqData['DESCRIÇÃO'],
                incorporacao: reqData['INCORPORAÇÃO'],
                marca: reqData['MARCA'],
                serie: reqData['SERIE'],
                valor: reqData['VALOR'],
                sala: reqData['SALA'],
                localizacao: reqData['LOCAL'],
                ativo: reqData['ATIVO/BAIXA'],
                obs: reqData['OBS'],
                qrcode: `${url.server}/public/qrcodes/${reqData["NI"]}.png`
            };
                
            list.push(newData);
        }

        return returnResponse(200, false, "Arquivo validado.", list);
    }

    async valideList(body, fields) {
        let list = [];
        let resultInputs = checkInputs(body, fields);
        let reqData = resultInputs.data;

        if (resultInputs.error == true) {
            return returnResponse(400, true, resultInputs.message);
        } else {
            return await verificar(reqData.list);
            
        }

        async function verificar(data) {
            for (let number of data) {
                const client = await patrimonioClient.buscar(number);
                if (client.status != 200) {
                    return returnResponse(400, true, "Erro. Alguns patrimônios não foram cadastrados.");
                } else {
                    list.push(client.data[0]);
                }
            }

            return returnResponse(200, false, "Lista validada.", list);
        }
    }
}

module.exports = new patrimonioSupport;