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

async function updatePet(req, res) {
    const { id } = req.params;
    const { nome, raca, tamanho, peso, caracteristicas, caminho_imagem } = req.body;

    const sucessoAtualizacao = await Pet.updatePet(id, nome, raca, tamanho, peso, caracteristicas, caminho_imagem);

    if (sucessoAtualizacao) {
        res.redirect(`/pets/${id}`);
    } else {
        res.render('atualizacaoFalhou');
    }

    const pet = await Pet.getPetById(id);

    if (!pet) {
        res.render('petNaoEncontrado');
        return;
    }
    res.render('editarPet', { pet });
}


// async function updatePet(req, res) {
//     const { id } = req.params;
//     const { nome, raca, tamanho, peso, caracteristicas, caminho_imagem } = req.body;

//     // Obtenha o objeto Pet da base de dados pelo ID


//     // Verifique se o objeto pet existe antes de renderizar
//     if (!pet) {
//         // Trate o caso em que o pet não foi encontrado (por exemplo, renderize uma página de erro)
//         res.render('petNaoEncontrado');
//         return;
//     }

//     // Renderize a página 'editarPet' com o objeto pet
//     res.render('editarPet', { pet });
// }

async function getPetById(req, res) {
    if (await Pet.updatePet(req.params.id_animal)) {
        Pet.getById(id, (err, pet) => {
            if (err) {
                console.error('Erro ao obter o pet:', err);
                return res.status(500).send('Erro ao obter o pet do banco de dados.');
            }
            res.render('editarPet', { pet });
            console.log(pet);
        });
    }
}

module.exports = { getAll, addPet, deletePet, updatePet, getPetById }