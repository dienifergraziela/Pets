const mysql = require("mysql2/promise");
async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }

    const connection = await mysql.createConnection({
        host: 'sql10.freemysqlhosting.net',
        user: 'sql10645187',
        password: 'NdPtR6ss5F',
        database: 'sql10645187',
        port: 3306
    });
    console.log("conexão bem sucedida com o banco de dados!");
    global.connection = connection;
    return connection;
}

async function query(sql) {
    const conn = await connect();
    const [rows] = await conn.query(sql);
    console.log(rows);
    return rows;
}

module.exports = { query };