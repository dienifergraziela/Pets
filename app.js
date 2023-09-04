const express = require('express');
const path = require('path');
const userController = require('./controllers/userController');
const petController = require('./controllers/petController');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views")))
app.use(express.static(path.join(__dirname, "views/css")))

app.use(session({ secret: 'rdienigz' }));

app.use((req, res, next) => {
    if (!req.session.user) {
        if (req.originalUrl == '/login' || req.originalUrl == '/autenticar') {
            app.set('layout', './layouts/default/login.ejs');
            res.locals.layoutVariables = {
                url: process.env.URL,
                img: "/img/",
                style: "/css/",
                title: "Login",
                user: req.session.user
            };
            next();
        } else {
            res.redirect('/login');
        }
    } else {
        app.set('layout', './layouts/default/index.ejs');
        res.locals.layoutVariables = {
            url: process.env.URL,
            img: "/img/",
            style: "/css/",
            title: "Login",
            user: req.session.user
        };
        next();
    }
})

app.use(expressLayouts);
app.set('layout', './layouts/default/index.ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/login', (req, res) => {
    app.set('layout', './layouts/default/login.ejs');
    userController.login(req, res);
});

app.post('/login', (req, res) => {
    userController.autenticar(req, res);
});

app.get('/cadastrarPet', (req, res) => {
    res.render('cadastrarPet');
});

app.post('/cadastrarPet', petController.addPet);

app.listen(port, () => {
    console.log(`Aplicativo rodando em http://localhost:${port}`);
})

app.get('/perfil', (req, res) => {
    res.render('perfil');
})

app.get('/pets', petController.getAll);

//
// app.post('/pets/:id/excluir', petController.deletePet);

app.post('/pet/:id_animal/excluir', (req, res) => {
    petController.deletePet(req, res);
});

app.post('/pet/:id_animal/editar', (req, res) => {
    petController.updatePet(req, res);
})

app.get('/editarPet', (req, res) => {
    res.render('editarPet');
})

app.get('/tarefas/:id/editar', petController.getPetById);