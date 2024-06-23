class config {
    connection() {
        const connection = this.options();
        connection.database = process.env.MYSQL_DATABASE;

        return connection;
    }

    options() {
        return {
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
        };
    }
}

module.exports = new config;