const User = require('../models/userModel');

let users = [];

async function getUsers(req, res){
    users = await User.listarUser();
    res.render('perfil', { users });
}

function login(req, res){
    res.render("login");
}

async function autenticar(req, res){
    try{
        const resp = await User.autenticar(req.body.email, req.body.senha);

        if(resp && resp.length > 0){
            // res.status(200).json({ message: 'Usuário autenticado com sucesso!' });
            
            req.session.user = resp[0];
            res.redirect('/');
        } else{
            // res.status(401).json({ message: 'Credenciais inválidas!' });
            res.redirect('/login')
        }
    } catch(error){
        // res.status(500).json({ messsage: 'Erro durante a autenticação!'})
    }
}

async function logout(req, res){
    delete req.session.user;
    res.redirect('/login');
}

module.exports = { getUsers, login, autenticar, logout  };