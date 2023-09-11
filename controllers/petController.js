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

function addPet(req, res, imagePath) {
    const { id_animal, nome, raca, tamanho, peso, caracteristicas, caminho_imagem, user_id_user } = req.body;
    const pet = new Pet(id_animal, nome, raca, tamanho, peso, caracteristicas, caminho_imagem, user_id_user);
    pet.save(imagePath).then(() => console.log("pet cadastrado com sucesso!"));
    try {
        console.log("deu certo");
    } catch (error) {
        console.error('Erro ao salvar animal:', error);
    }
    res.redirect('/');
}

async function deletePet(req, res) {
    if (await Pet.deletePet(req.params.id_animal)) {
        res.redirect('/pets');
    } else {
        res.redirect('/pets');
    }
}

async function getPetById(req, res) {
    if(await Pet.getPetById(req.params.id_animal)) {
        console.log("aqui"+id_animal);
    }
}

async function updatePet(req, res) {
    const id_animal = req.params.id_animal;
    const { nome, raca, tamanho, peso, caracteristicas, caminho_imagem, user_id_user } = req.body;
    try {
        const updatedPet = await Pet.updatePet(id_animal, nome, raca, tamanho, peso, caracteristicas, caminho_imagem, user_id_user);
        if (updatedPet) {
            console.log('Pet atualizado com sucesso!');
            res.redirect('/pets'); // Redirecionar para a lista de pets após a atualização
        } else {
            res.status(404).send('Pet não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao atualizar o pet:', error);
        res.status(500).send('Erro ao atualizar o pet no banco de dados.');
    }
}

module.exports = { getAll, addPet, deletePet, updatePet, getPetById }