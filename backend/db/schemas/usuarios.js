const sqlite3 = require('sqlite3').verbose();

function createTableUsers() {
const db = new sqlite3.Database("./backend/asegura2.sqlite3", sqlite3.OPEN_READWRITE, () =>{
        db.run(`
            CREATE TABLE IF NOT EXISTS Usuarios(
                DNI VARCHAR(10) PRIMARY KEY,
                Nombre VARCHAR(50) NOT NULL,
                Nombre_Usuario VARCHAR(20) NOT NULL UNIQUE,
                Email VARCHAR(50) NOT NULL UNIQUE,
                Fecha_Nacimiento DATE NOT NULL,
                Contraseña VARCHAR(20) NOT NULL,
                Telefono VARCHAR(10) NOT NULL,
                Direccion VARCHAR(50) NOT NULL,
                Ocupacion VARCHAR(30) NOT NULL,
                Validacion BOOLEAN NOT NULL,
                Id_Tipo_Documento INTEGER NOT NULL,
                Id_Rol INTEGER NOT NULL,
                FOREIGN KEY (Id_Tipo_Documento) REFERENCES Tipo_Documento(Id_Tipo_Documento) ON DELETE RESTRICT,
                FOREIGN KEY (Id_Rol) REFERENCES Roles(Id_Rol) ON DELETE RESTRICT
            )
        `)
        })

}
module.exports = {createTableUsers} 