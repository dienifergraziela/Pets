const Database = require('./database');

class Pet {
    constructor(id_animal, nome, raca, tamanho, peso, caracteristicas, caminho_imagem, user_id_user) {
        this.id_animal = id_animal;
        this.nome = nome;
        this.raca = raca;
        this.tamanho = tamanho;
        this.peso = peso;
        this.caracteristicas = caracteristicas;
        this.caminho_imagem = caminho_imagem;
        this.user_id_user = user_id_user;
    }

    static async listaPet() {
        let pets = await Database.query("SELECT * FROM animal");
        return pets;
    }

    async save(imagePath) {
        console.log("oi:" + imagePath);
        let id_user = await Database.query('select id_user from user');
        let resp = await Database.query(`INSERT INTO animal (nome, raca, tamanho, peso, caracteristicas, caminho_imagem, user_id_user ) VALUES ('${this.nome}', '${this.raca}', '${this.tamanho}', '${this.peso}' , '${this.caracteristicas}', '${imagePath}', "1" );`);
        console.log(resp);
        this.id = resp.insertId;
    }

    static async deletePet(id_animal) {
        const resp = await Database.query(`DELETE FROM animal WHERE id_animal = ${id_animal}`)
        if (resp) {
            if (resp.affectedRows > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    static async updatePet(id_animal) {
        let pets = await Database.query("SELECT * FROM animal");
        const resp = await Database.query(`UPDATE animal SET nome = ?, raca = ?, tamanho = ?, peso = ?, caracteristicas = ? WHERE id_animal ${id_animal}`)
        if (resp) {
            if (resp.affectedRows > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    static async getById(id_animal, callback) {
        const resp = await Database.query('SELECT * FROM animal WHERE id_animal = ?');
        if (resp) {
            return callback(null, id_animal);
        }
    }

}

module.exports = Pet