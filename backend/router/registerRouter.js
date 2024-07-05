const express = require('express');
const router = express.Router();
const registro = require('../controller/registro');

router.get('/', (req, res) => {
    res.send('hola mundo');
})

router.post('/guardar', registro.crearUsuario);

router.get('/validacion', (req, res)=>{
    res.send('Hola')
})

router.post('/validar', registro.validateUser);

router.post('/reenviar', registro.email);

module.exports = router;