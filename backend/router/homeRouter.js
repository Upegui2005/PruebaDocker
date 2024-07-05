const express = require('express');
const router = express.Router();
const home = require('../controller/home');


router.post('/homePage', home.home)

router.post('/misSeguros', home.myInsurances);

router.post('/beneficiarios', home.beneficiarios);

router.post('/polizas', home.detalleSeguro);

router.post('/pagos', home.pagos);

router.post('/pdf', home.pdfSeguro);

router.post('/proximoPago', home.proximoPago);

module.exports = router