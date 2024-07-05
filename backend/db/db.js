const sqlite3 = require('sqlite3');
const users = require('./schemas/usuarios');
const vendedores = require('./schemas/vendedores');
const tipoDocumento = require('./schemas/tipoDocumento');
const seguros = require('./schemas/seguros');
const polizas = require("./schemas/polizas");
const beneficiarios = require('./schemas/beneficiarios');
const pagos = require('./schemas/pagos')
const medioPago = require("./schemas/medioPago");
const tarjetas = require("./schemas/tarjetas");
const roles = require("./schemas/roles");
const polizasBeneficiarios = require('./schemas/polizasBeneficiarios');

const db = new sqlite3.Database("./backend/asegura2.sqlite3", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (error) =>{
    if(error){
        console.error(error)
    }
    else{
        console.log('Conected')
    }
})

//Creacion de tablas
users.createTableUsers();
vendedores.createTableSalesPerson();
tipoDocumento.createTableDocumentType();
seguros.createTableInsurance();
polizas.createTablePolicies();
beneficiarios.createTableBeneficiaries();
pagos.createTablePayments();
medioPago.createTableMeansOfPayments();
tarjetas.createTableCard();
roles.createTableRoles();
polizasBeneficiarios.createTablePoliciesBeneficiaries();
//Fin Creacion


module.exports = {db};