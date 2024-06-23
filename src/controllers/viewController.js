const patrimonios = require("../utils/patrimonios");
const registros = require("../utils/registros");
const path = require("path");

const renderizar = (res, body) => {
    body.interface = body.interface || "main";
    
    res.render("index", { body: body });
}

class viewController {
    inicio(req, res) {
        res.redirect("/listar");
    }

    validar(req, res) {
        renderizar(res, { body: 'validar', interface: "clean", out: false });
    }

    sair(req, res) {
        delete req.session.sess;
        renderizar(res, { body: 'validar', interface: "clean", out: true });
    }

    registrar(req, res) {
        let valido = false;
        if (req.session.sess) { valido = true; }
        else {valido = false}
        renderizar(res, { body: 'registrar', valido: valido });
    }

    async listar(req, res) {
        const json = await patrimonios();
        renderizar(res, { body: 'listar', tabela: json });
    }

    async registros(req, res) {
        const json = await registros();
        renderizar(res, { body: 'registros', tabela: json });
    }

    escanear(req, res) {
        renderizar(res, { body: 'escanear' });
    }

    async imprimir(req, res) {
        const json = await patrimonios();
        renderizar(res, { body: 'imprimir', tabela: json });
    }

    cadastrar(req, res) {
        renderizar(res, { body: 'cadastrar' });
    }

    importar(req, res) {
        renderizar(res, { body: 'importar' });
    }

    async exportar(req, res) {
        const json = await patrimonios();
        renderizar(res, { body: 'exportar', tabela: json });
    }

    deletar(req, res) {
        renderizar(res, { body: 'deletar' });
    }

    atualizar(req, res) {
        const { id } = req.params;
        renderizar(res, { body: 'atualizar', id: id });
    }

    modificar(req, res) {
        const { email } = req.params;
        renderizar(res, { body: 'modificar', email: email });
    }

    uso(req, res) {
        renderizar(res, { body: 'uso', interface: "center" });
    }

    read(req, res) {
        res.sendFile(path.join(__dirname, "../../README.md"))
    }

    erro(req, res) {
        renderizar(res, { body: 'erro', interface: "clean" });
    }
}

module.exports = new viewController;