const sqlite3 = require('sqlite3')

function createTableSalesPerson(){
    const db = new sqlite3.Database("./backend/asegura2.sqlite3", sqlite3.OPEN_READWRITE, (err) =>{
        db.run(
            `
                CREATE TABLE IF NOT EXISTS Vendedores ( 
                    Id_Vendedor INTEGER PRIMARY KEY AUTOINCREMENT,
                    Cedula INT(10) NOT NULL,
                    Nombre VARCHAR(50) NOT NULL, 
                    Nombre_Usuario VARCHAR(20) NOT NULL,
                    Email VARCHAR(50) NOT NULL,
                    Fecha_Nacimiento DATE NOT NULL,
                    Contraseña VARCHAR(20) NOT NULL,
                    Telefono VARCHAR(10) NOT NULL, 
                    Comisión INT NOT NULL,
                    Id_Rol INTEGER NOT NULL,
                    Id_Tipo_Documento INTEGER NOT NULL,
                    FOREIGN KEY (Id_Rol) REFERENCES Roles(Id_Rol) ON DELETE RESTRICT,
                    FOREIGN KEY (Id_Tipo_Documento) REFERENCES Tipo_Documento(Id_Tipo_Documento) ON DELETE RESTRICT
                )
            `
        );
    }) 
}

module.exports = {createTableSalesPerson};