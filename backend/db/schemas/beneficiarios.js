const sqlite3 = require('sqlite3');

function createTableBeneficiaries(){
    const db = new sqlite3.Database("./backend/asegura2.sqlite3", sqlite3.OPEN_READWRITE, () => {
        db.run(
            `
                CREATE TABLE IF NOT EXISTS Beneficiarios(
                    Id_Beneficiario INTEGER PRIMARY KEY AUTOINCREMENT,
                    Documento VARCHAR(10) NOT NULL UNIQUE,
                    Nombre VARCHAR(50) NOT NULL,
                    Telefono VARCHAR(10) NOT NULL,
                    Direccion VARCHAR(30) NOT NULL,
                    Fecha_Nacimiento DATE NOT NULL,
                    Id_Tipo_Documento INTEGER NOT NULL,
                    FOREIGN KEY (Id_Tipo_Documento) REFERENCES Tipo_Documento(Id_Tipo_Documento) ON DELETE RESTRICT
                )
            `
        )
    })
}

module.exports = {createTableBeneficiaries};