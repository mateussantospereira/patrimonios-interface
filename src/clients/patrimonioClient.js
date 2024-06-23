const patrimonioModel = require("../models/patrimonioModel");
const patrimonioAssistece = require("../assistences/patrimonioAssistence");
const returnResponse = require("../helpers/returnResponse");
const xlsx = require("xlsx");
const pdf = require("html-pdf");
const qr = require("qrcode");
const fs = require("fs");

class patrimonioClient {
    async listar() {
        const model = patrimonioModel.listar();
        return model
            .then((patrimonios) => {
                if (patrimonios[0]) {
                    return returnResponse(200, false, "Patrimônios listados com êxito.", patrimonios)
                } else {
                    return returnResponse(202, false, "Nenhum patrimônio cadastrado no momento.")
                }
            })
            .catch(() => {
                return returnResponse(400, true, "Erro interno.")
            });
    }

    async buscar(id) {
        const model = patrimonioModel.buscar(id);
        return model
            .then((patrimonio) => {
                if (patrimonio[0]) {
                    return returnResponse(200, false, "Patrimônio buscado com êxito.", patrimonio);
                } else {
                    return returnResponse(404, true, "Erro. Patrimônio inexistente.");
                }
            })
            .catch(() => {
                return returnResponse(400, true, "Erro interno.")
            });
    }

    async criar(data) {
        const model = patrimonioModel.criar(data);
        return model
            .then(() => {
                try {
                    qr.toFile(
                        `./public/qrcodes/${data.ni}.png`,
                        `${data.ni} - ${data.descricao}`,
                        { type: "png" }
                    );
                } catch (error) {
                    return returnResponse(400, true, `Erro ao criar patrimônio.`);
                }

                return returnResponse(201, false, `Patrimônio n° ${data.ni} criado com sucesso.`);
            })
            .catch((error) => {
                return returnResponse(400, true, "Erro interno.")
            });
    }

    async importar(req, limit, fileName) {
        let data = [];
        const kilobyte = limit;
        const byte = kilobyte * 1000;
        const file = fs.createWriteStream(`./public/xlsx/import/${fileName}`);

        return new Promise((resolve) => {
            req.on("data", chunk => {
                data.push(chunk);
            });
            req.on("end", () => {
                data = Buffer.concat(data);

                if (data.length > byte) {
                    file.end();
                    return resolve(returnResponse(400, true,
                        `Erro. Este arquivo supera o limite de tamanho (${kilobyte} KB).`));
                }

                file.write(data);
                file.end("end", (error) => {
                    if (error) {
                        return resolve(returnResponse(400, true,
                            "Erro ao criar arquivo XLSX."));
                    }

                    return resolve(returnResponse(201, false,
                        "Arquivo XLSX criado com êxito."));
                });
            });
        });
    }

    async exportar(data, head, fileName) {
        data = JSON.stringify(data);
        data = JSON.parse(data);

        try {
            const keys = Object.keys(data[0]);

            data.forEach((p) => {
                keys.forEach((key) => {
                    if (key == "incorporacao") {
                        let date = p[key].slice(0, 10).split("-");
                        p[key] = `${date[2]}/${date[1]}/${date[0]}`;
                    }
                    if (!head[key]) {
                        delete p[key];
                    } else {
                        delete Object.assign(p, { [head[key]]: p[key] })[key];
                    };
                });
            });

            const worksheet = xlsx.utils.json_to_sheet(data);
            const workbook = xlsx.utils.book_new();

            xlsx.utils.book_append_sheet(workbook, worksheet, "Patrimônios");
            await xlsx.writeFile(workbook, `./public/xlsx/export/${fileName}.xlsx`);

            const url = `/public/xlsx/export/${fileName}.xlsx`;

            return returnResponse(201, false, "Arquivo XLSX criado com êxito.", url);
        } catch (error) {
            return returnResponse(400, true, "Erro ao tentar criar arquivo XLSX.")
        }
    }

    async imprimir(data, options, fileName) {
        const assistence = await patrimonioAssistece.gerarHTML(data);

        return gerarPDF(assistence);

        async function gerarPDF(html) {
            return new Promise((resolve, reject) => {
                pdf.create(html, options).toFile(
                    `./public/pdf/${fileName}.pdf`, (error, file) => {
                        if (error) {
                            console.log(error)
                            return resolve(returnResponse(400, true, "Erro ao gerar arquivo."));
                        };

                        let filename = file["filename"];

                        if (filename.includes("\\")) {
                            filename = filename.split("\\").pop();
                        } else {
                            filename = filename.split("/").pop();
                        }

                        const url = `/public/pdf/${filename}`;

                        return resolve(returnResponse(201, false, "Arquivo gerado com êxito.", url));
                    }
                );
            });
        }
    }

    async atualizar(data, id) {
        const model = patrimonioModel.atualizar(data, id);
        return model
            .then(() => {
                return returnResponse(200, false, `Patrimônio n° ${id} atualizado com êxito.`);
            })
            .catch(() => {
                return returnResponse(400, true, "Erro interno.")
            });
    }

    async deletar(id) {
        const model = patrimonioModel.deletar(id);
        return model
            .then(() => {
                let file = `./public/qrcodes/${id}.png`;
                
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                }
                
                return returnResponse(200, false, `Patrimônio n° ${id} excluido com êxito.`);
            })
            .catch(() => {
                return returnResponse(400, true, "Erro interno.");
            });
    }

    async truncar() {
        const model = patrimonioModel.truncar();
        return model
            .then(() => {
                let dir = fs.readdirSync("./public/qrcodes");

                dir.forEach(async (file) => {
                    if (file != "qrcodes.txt" && file != "blank.png") {
                        fs.unlinkSync(`./public/qrcodes/${file}`);
                    }
                });

                return returnResponse(200, false, "Patrimônios truncados com êxito.");
            })
            .catch(() => {
                return returnResponse(400, true, "Erro interno.");
            });
    }
}

module.exports = new patrimonioClient;