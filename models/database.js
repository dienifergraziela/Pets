const mysql = require("mysql2/promise");
// const { DB_DATABASE } = require("../config");

async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mvc_pet'
    });
    console.log("Conectou no MySQL!!");
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