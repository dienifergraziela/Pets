const Pet = require('../models/petModel');

let listaPets = {};
async function getAll(req, res) {
    try {
        listaPets = await Pet.listaPet();
        console.log('Hello Word');
        console.log(listaPets);
        res.render('pets', { listaPets });
    } catch (error) {
        console.log(error);
    }
}

function addPet(req, res) {
    const { id_animal, nome, raca, tamanho, peso, caracteristicas, caminho_imagem, user_id_user } = req.body;

    const pet = new Pet(id_animal, nome, raca, tamanho, peso, caracteristicas, caminho_imagem, user_id_user);
    pet.save().then(() => console.log("pet cadastrado com sucesso!"));
    res.redirect('/');
}

async function deletePet(req, res) {
    if (await Pet.deletePet(req.params.id_animal)) {
        res.redirect('/pets');
    } else {
        res.redirect('/pets');
    }
}

async function updatePet(req, res) {
    if (await Pet.updatePet(req.params.id_animal)) {
        res.redirect('/pets');
    } else {
        res.redirect('/pets');
    }
}

async function getPetById(req, res) {
    const { id } = req.params;

    Pet.getById(id, (err, pet) => {
        if (err) {
            console.error('Erro ao obter o pet tarefa:', err);
            return res.status(500).send('Erro ao obter o pet do banco de dados.');
        }
        return res.render('editarPet', { pet }); // Renderiza o formulário de edição com os dados da tarefa
    });
}



module.exports = { getAll, addPet, deletePet, updatePet, getPetById }