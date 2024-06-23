const executeQuery = require("../helpers/executeQuery");

class PatrimonioModel {
    async listar() {
        const sql = "SELECT * FROM patrimonios";
        return await executeQuery(sql);
    }

    async buscar(id) {
        const sql = "SELECT * FROM patrimonios WHERE ni = ?";
        return await executeQuery(sql, id);
    }

    async criar(patrimonio) {
        const sql = "INSERT INTO patrimonios SET ?";
        return await executeQuery(sql, patrimonio);
    }

    async atualizar(atualizado, id) {
        const sql = "UPDATE patrimonios SET ? WHERE ni = ?";
        return await executeQuery(sql, [atualizado, id]);
    }

    async deletar(id) {
        const sql = "DELETE FROM patrimonios WHERE ni = ?";
        return await executeQuery(sql, id);
    }

    async truncar() {
        const sql = "TRUNCATE TABLE patrimonios";
        return await executeQuery(sql);
    }
}

module.exports = new PatrimonioModel();