const sqlite3 = require('sqlite3');

function createTableCard(){
    const db = new sqlite3.Database("./backend/asegura2.sqlite3", sqlite3.OPEN_READWRITE, () => {
        db.run(
            `CREATE TABLE IF NOT EXISTS Tarjetas(
                Id_Tarjeta INTEGER PRIMARY KEY AUTOINCREMENT,
                Nombre_Titular VARCHAR(50) NOT NULL,
                Numero_Tarjeta INT NOT NULL UNIQUE,
                Franquicia VARCHAR(50) NOT NULL,
                Fecha_Vencimiento DATE NOT NULL,
                Cvc INT NOT NULL UNIQUE
            )`
        )
    })
}

module.exports = {createTableCard};