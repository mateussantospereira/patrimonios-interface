const patrimonioClient = require("../clients/patrimonioClient");
const patrimonioField = require("../fields/patrimonioField");
const patrimonioSupport = require("../supports/patrimonioSupport");
const { response } = require("../helpers/response");
const { checkInputs } = require("../helpers/checkInputs");
const { url } = require("../config/url");
const xlsx = require("xlsx");
const fs = require("fs");

class patrimonioController {
    async listar(req, res) {
        const client = await patrimonioClient.listar();
        return res.status(client.status).json(client);
    }

    async buscar(req, res) {
        const { id } = req.params;
        const client = await patrimonioClient.buscar(id);
        return res.status(client.status).json(client);
    }

    async criar(req, res) {
        const fields = await patrimonioField.criar();
        let resultInputs = checkInputs(req.body, fields);
        let reqData = resultInputs.data;

        if (resultInputs.error == true) {
            return response(res, 400, true, resultInputs.message);
        } else {
            reqData.qrcode = `${url.server}/public/qrcodes/${reqData.ni}.png`;
            buscar(reqData.ni);
        }

        async function buscar(id) {
            const client = await patrimonioClient.buscar(id);
            if (client.status != 200) {
                criar(reqData);
            } else {
                response(res, 400, true, "Este número de patrimônio já está em uso.");
            };
        }

        async function criar(data) {
            const client = await patrimonioClient.criar(data);
            return res.status(client.status).json(client);
        }
    }

    async importar(req, res) {
        const fileName = `${Date.now()}${req["sessionID"]}`;
        const importarField = await patrimonioField.importar();
        const kilobyte = importarField.kilobyte;

        const client = await patrimonioClient.importar(req, kilobyte, fileName);

        if (client.status != 201) {
            return deleteFile(
                400, true, client.message);
        }

        return await readXLSX();

        function deleteFile(status, error, message) {
            fs.unlinkSync(`./public/xlsx/import/${fileName}`);
            return response(res, status, error, message);
        }

        async function readXLSX() {
            async function readFile() {
                const file = xlsx.readFile(`./public/xlsx/import/${fileName}`);
                const temp = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
                const fields = importarField.fields;
                const support = await patrimonioSupport.valideXLSX(temp, fields);

                if (support.status != 200) {
                    return deleteFile(400, true, support.message);
                }

                return cadastrar(support.data);

                async function cadastrar(data) {
                    for (let line of data) {
                        const client = await patrimonioClient.criar(line);
                        if (client.status != 201) {
                            return deleteFile(400, true, "Erro ao cadastrar patrimônios.");
                        }
                    }

                    return deleteFile(201, false, "Importação concluída com êxito.");
                }
            }

            try {
                return await readFile();
            } catch (error) {
                return deleteFile(
                    400, true, "Erro ao ler arquivo. Envie um arquivo XLSX válido.");
            }
        }
    }

    async exportar(req, res) {
        const fileName = `${Date.now()}${req["sessionID"]}`;
        const body = { list: `${req.body.list},` };
        const exportarField = await patrimonioField.exportar();
        const head = exportarField.head;
        const fields = exportarField.list;
        const support = await patrimonioSupport.valideList(body, fields);

        if (support.status != 200) {
            return res.status(support.status).json(support);
        }

        createXLSX(support.data, head);

        async function createXLSX(patrimonios, head) {
            const client = await patrimonioClient.exportar(patrimonios, head, fileName);

            res.status(client.status).json(client);

            if (client.status == 201) {
                new Promise(() => {
                    setTimeout(() => {
                        fs.unlinkSync((`./${client.data}`));
                    }, 3000);
                });
            }
        }
    }

    async imprimir(req, res) {
        const fileName = `${Date.now()}${req["sessionID"]}`;
        const body = { list: `${req.body.list},` };
        const imprimirField = await patrimonioField.imprimir();
        const options = imprimirField.options;
        const fields = imprimirField.list;
        const support = await patrimonioSupport.valideList(body, fields);

        if (support.status != 200) {
            return res.status(support.status).json(support);
        }

        gerarPDF(support.data, options);

        async function gerarPDF(data, options) {
            const client = await patrimonioClient.imprimir(data, options, fileName);

            res.status(client.status).json(client);

            if (client.status == 201) {
                new Promise(() => {
                    setTimeout(() => {
                        fs.unlinkSync((`./${client.data}`));
                    }, 3000);
                });
            }
        }
    }

    async atualizar(req, res) {
        const { id } = req.params;
        const body = req.body;
        const fields = await patrimonioField.atualizar();
        let resultInputs = checkInputs(body, fields);
        let reqData = resultInputs.data;

        if (resultInputs.error == true) {
            return response(res, 400, true, resultInputs.message);
        } else {
            return atualizar(reqData, id);
        }

        async function atualizar(data, id) {
            const client = await patrimonioClient.atualizar(data, id);
            return res.status(client.status).json(client);
        }
    }

    async deletar(req, res) {
        const { id } = req.params;
        const client = await patrimonioClient.deletar(id);
        return res.status(client.status).json(client);
    }

    async truncar(req, res) {
        const client = await patrimonioClient.truncar();
        return res.status(client.status).json(client);
    }
}

module.exports = new patrimonioController;