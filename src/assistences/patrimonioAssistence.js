const patrimonioField = require("../fields/patrimonioField");
const { url } = require("../config/url")

class patrimonioAssistece {
    async gerarHTML(data) {
        const field = await patrimonioField.imprimir();
        let column = field.column;
        let lines = field.lines;
        let contador = 0;
        let tables = [];
        let trs = [];
        let tr = [];
        let td = [];
        let white = [];
        let blank = `
            <td>
                <div class="blank">
                    <img src="${url.local}/public/qrcodes/blank.png">
                    <p>
                        0000<br>
                        <img src="${url.local}/public/img/senai.png" id="senai">
                    </p>
                </div>
            </td>
        `
        let text = ``;

        data.forEach((patrimonio) => {
            if (contador % column == 0 && contador != 0) {
                tr.push(td);
                td = [];
            }
            td.push(`
                <td>
                    <div>
                        <img src="${patrimonio.qrcode}">
                        <p>
                            ${patrimonio.ni}<br>
                            <img src="${url.local}/public/img/senai.png" id="senai">
                        </p>
                    </div>
                </td>
            `);
            contador++;
        });

        if (td[0]) {
            while (td.length < column) {
                td.push(blank);
            }
            tr.push(td);
        }

        contador = 0;

        tr.forEach((line) => {
            if (contador % lines == 0 && contador != 0) {
                tables.push(trs);
                trs = [];
            }
            contador++;
            trs.push(line);
        });

        contador = 0;

        if (trs[0]) {
            while (trs.length < lines) {
                while (contador < column) {
                    white.push(blank);
                    contador++;
                }
                trs.push(white);
            }
            tables.push(trs);
        }

        tables.forEach((table) => {
            text = text + `<table>`;
            table.forEach((line) => {
                text = text + `<tr>`;
                line.forEach((content) => {
                    text = text + `${content}`;
                })
                text = text + `</tr>`;
            })
            text = text + `</table>`;
        });

        let html = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="${url.local}/public/css/pdf.css">
                    <title>Document</title>
                </head>
                <body>
                    ${text}
                </body>
            </html>
        `;

        return html;
    }
}

module.exports = new patrimonioAssistece;