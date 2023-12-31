const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const userController = require('./controllers/userController');
const petController = require('./controllers/petController');

require('dotenv').config();
const multer = require('multer');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views")))
app.use(express.static(path.join(__dirname, "views/css")))

app.use(express.static("uploads"));

app.use(session({ secret: 'rdienigz' }));
// app.use(session({
//     secret: 'rdienigz',
//     resave: false, 
//     saveUninitialized: true,
// }));

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

app.listen(port, () => {
    console.log(`Aplicativo rodando em http://localhost:${port}`);
})

app.get('/', (req, res) => {
    res.render('home');
})

app.post('/login', (req, res) => {
    userController.autenticar(req, res);
});

app.get('/login', (req, res) => {
    app.set('layout', './layouts/default/login.ejs');
    userController.login(req, res);
});

app.get('/cadastrarPet', (req, res) => {
    res.render('cadastrarPet');
});

app.get('/perfil', userController.getUsers);

app.get('/pets', petController.getAll);

app.post('/pet/:id_animal/excluir', (req, res) => {
    petController.deletePet(req, res);
});

// app.post('/pets/:id/editar', petController.updatePet);

// app.get('/editarPet', (req, res) => {
//     petController.updatePet(req, res);
//     res.render('editarPet');
// })

app.post('/logout', (req, res) => {
    userController.logout(req, res);
});

app.get('/logout', (req, res) => {
    res.render('login');
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const filePath = file.originalname + Date.now() + path.extname(file.originalname);
        cb(null, filePath);
    }
})
const upload = multer({ storage })

app.post('/cadastrarPet', upload.single("file"), (req, res) => {
    const imageName = req.file.filename;
    console.log("upload realizado com sucesso!");
    console.log(imageName);
    petController.addPet(req, res, imageName);
})

app.get('/pets/edit/:id_animal', petController.getPetById);

app.post('/pets/edit/:id_animal', petController.updatePet);
