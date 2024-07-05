const login = require ('../controller/login');
const express = require('express');
const session = require('../session');
const router = express.Router();


router.get('/', (req, res) =>{
    res.send('hola')
});

router.post('/login', login.login);

router.post('/logout', login.logout);

router.post('/session', (req, res) => {
    res.json({ userId: req.session.userId }); // Enviar el userId almacenado en la sesión
});

router.get('/home', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, ''));
    } else {
        res.redirect('/');
    }
});

router.post('/enviarCorreo', login.email);

router.post('/cambioPassword', login.cambiarContraseña);

module.exports = router;