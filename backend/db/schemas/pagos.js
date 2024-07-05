const sqlite3 = require('sqlite3');

function createTablePayments() {
    const db = new sqlite3.Database("./backend/asegura2.sqlite3", sqlite3.OPEN_READWRITE, () =>{
        db.run(
            `
                CREATE TABLE IF NOT EXISTS Pagos(
                    Id_Pago INTEGER PRIMARY KEY AUTOINCREMENT,
                    Fecha_Pago DATE NOT NULL,
                    Cantidad_Pago INT NOT NULL,
                    Id_Medio_Pago INTEGER NOT NULL,
                    Id_Poliza INTEGER NOT NULL,
                    Id_Tarjeta INTEGER,
                    FOREIGN KEY (Id_Medio_Pago) REFERENCES Medios_Pagos(Id_Medio_Pago) ON DELETE CASCADE,
                    FOREIGN KEY (Id_Poliza) REFERENCES Polizas(Id_Poliza) ON DELETE CASCADE,
                    FOREIGN KEY (Id_Tarjeta) REFERENCES Tarjetas(Id_Tarjeta) ON DELETE CASCADE
                );
            `
        )
    })
}

module.exports = {createTablePayments}