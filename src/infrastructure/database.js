const executeQuery = require("../helpers/executeQuery");
const config = require("./config");
const mysql = require("mysql");

class database {
    async init() {
        await this.createDatabase();
        await this.createTableRegistros();
        await this.createTablePatrimonios();
    }

    async createDatabase() {
        const database = process.env.MYSQL_DATABASE;
        const sql = `CREATE DATABASE IF NOT EXISTS ${database};`;

        const connection = mysql.createConnection(config.options());

        return new Promise((resolve, reject) => {
            connection.query(sql, (error) => {
                if (error) {
                    return reject(console.log("Erro ao criar banco de dados: ", error));
                }

                return resolve(console.log("Banco de dados criado com êxito."));
            });
        });
    }

    async createTableRegistros() {
        const sql = `
            CREATE TABLE IF NOT EXISTS registros (
                id int not null auto_increment primary key,
                nome varchar(100) not null,
                email varchar(100) not null,
                senha varchar(100) not null
            );
        `;

        return await this.createTable(sql, "Registros");
    }

    async createTablePatrimonios() {
        const sql = `
            CREATE TABLE IF NOT EXISTS patrimonios (
                ni varchar(40) not null primary key,
                instituicao varchar(50) not null,
                tag varchar(50) default "x",
                descricao varchar(100) not null,
                incorporacao date not null,
                marca varchar(50) not null,
                serie varchar(50) default "x",
                valor varchar(50) not null,
                sala varchar(50) not null,
                localizacao varchar(100) not null,
                ativo varchar(50) default "Ativo",
                obs varchar(100) default "Não",
                qrcode varchar(100)
            ); 
        `;

        return await this.createTable(sql, "Patrimônios");
    }

    async createTable(sql, name) {
        try {
            await executeQuery(sql);
            return console.log(`Tabela ${name} criada com êxito.`);
        } catch (error) {
            return console.log("Erro ao criar tabela: ", error);
        }
    }
}

module.exports = new database;