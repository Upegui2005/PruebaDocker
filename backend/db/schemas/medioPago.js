const sqlite3 = require('sqlite3');

function createTableMeansOfPayments(){
    const db = new sqlite3.Database("./backend/asegura2.sqlite3",sqlite3.OPEN_READWRITE, (err) => {
        db.run(`CREATE TABLE IF NOT EXISTS Medios_Pagos (
                    Id_Medio_Pago INTEGER PRIMARY KEY AUTOINCREMENT,
                    Tipo_Pago VARCHAR
                )`
        );
    })
}

module.exports = {createTableMeansOfPayments};