const Database = require('./database');

class User{
    constructor(id, nome, email, senha){
        this.id= id;
        this.nome= nome;
        this.email= email;
        this.senha= senha;
    }

    static async autenticar(email, senha){
        const md5 = require('md5');
        let sql = `SELECT * FROM user WHERE email='${email}' AND senha='${md5(senha)}';`
        return await Database.query(sql);
    }

    static async listarUser(){
        let users = await Database.query("SELECT * FROM user");
        return users;
    }

}

module.exports = User