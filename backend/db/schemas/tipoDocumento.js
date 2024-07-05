const sqlite3 = require('sqlite3');

function createTableDocumentType(){
    const db = new sqlite3.Database("./backend/asegura2.sqlite3", sqlite3.OPEN_READWRITE, (err) => {
        db.run(
            `
                CREATE TABLE IF NOT EXISTS Tipo_Documento(
                    Id_Tipo_Documento INTEGER PRIMARY KEY AUTOINCREMENT, 
                    Nombre_Documento VARCHAR
                )
            `
        )
    })
}

module.exports = {createTableDocumentType};