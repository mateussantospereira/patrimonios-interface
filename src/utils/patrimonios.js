const { url } = require("../config/url");

module.exports = async () => {
    const response = await fetch(`${url.local}/patrimonio/listar`);
    const json = await response.json();

    if (json["data"]) {
        json["data"].forEach((p) => {
            p["atualizacao"] = {
                href: `/atualizar/${p["ni"]}`,
                text: "Atualizar"
            };
        });
    }

    return json
}