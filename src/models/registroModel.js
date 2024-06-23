const executeQuery = require("../helpers/executeQuery");

class RegistroModel {
    async listar() {
        const sql = "SELECT * FROM registros";
        return await executeQuery(sql);
    }

    async buscar(email) {
        const sql = "SELECT * FROM registros WHERE email = ?";
        return await executeQuery(sql, email);
    }

    async criar(registro) {
        const sql = "INSERT INTO registros SET ?";
        return await executeQuery(sql, registro);
    }

    async atualizar(atualizado, email) {    
        const sql = "UPDATE registros SET ? WHERE email = ?";
        return await executeQuery(sql, [atualizado, email]);
    }

    async deletar(email) {
        const sql = "DELETE FROM registros WHERE email = ?";
        return await executeQuery(sql, email);
    }
}

module.exports = new RegistroModel();