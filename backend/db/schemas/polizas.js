const sqlite3 = require('sqlite3');

function createTablePolicies(){
    const db = new sqlite3.Database("./backend/asegura2.sqlite3", sqlite3.OPEN_READWRITE, (err) => {
        db.run(
                `CREATE TABLE IF NOT EXISTS Polizas(
                    Id_Poliza INTEGER PRIMARY KEY AUTOINCREMENT,
                    Fecha_Inicio DATE NOT NULL,
                    Fecha_Fin DATE NOT NULL,
                    Fecha_Pagos DATE NOT NULL,
                    Proximo_Pago DATE NOT NULL,
                    DNI VARCHAR(10) NOT NULL,
                    Id_Seguro INTEGER NOT NULL,
                    Id_Vendedor INTEGER,
                    FOREIGN KEY (DNI) REFERENCES Usuarios(DNI) ON DELETE CASCADE,
                    FOREIGN KEY (Id_Seguro) REFERENCES Seguros(Id_Seguro) ON DELETE CASCADE,
                    FOREIGN KEY (Id_Vendedor) REFERENCES Vendedores(Id_Vendedor) ON DELETE CASCADE
                )`
            )
    })
}
module.exports = {createTablePolicies};