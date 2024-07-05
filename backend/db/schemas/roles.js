const sqlite3 = require('sqlite3');

function createTableRoles(){
    const db = new sqlite3.Database("./backend/asegura2.sqlite3", sqlite3.OPEN_READWRITE, (err) => {
        db.run(`CREATE TABLE IF NOT EXISTS Roles(
                    Id_Rol INTEGER PRIMARY KEY AUTOINCREMENT,
                    Nombre_Rol VARCHAR(30) NOT NULL UNIQUE
                )`
        )
    })
}

module.exports = {createTableRoles};