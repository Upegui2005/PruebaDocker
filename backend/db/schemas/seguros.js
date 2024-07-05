const sqlite3 = require('sqlite3');

function createTableInsurance(){
    const db = new sqlite3.Database("./backend/asegura2.sqlite3", sqlite3.OPEN_READWRITE, (err) => {
        db.run(
            `
                CREATE TABLE IF NOT EXISTS Seguros(
                    Id_Seguro INTEGER PRIMARY KEY AUTOINCREMENT,
                    Nombre_Seguro VARCHAR(30) NOT NULL,
                    Cobertura VARCHAR NOT NULL,
                    Limite VARCHAR NOT NULL,
                    Precio INT NOT NULL
                )
            `
        )
    })
}

module.exports = {createTableInsurance};