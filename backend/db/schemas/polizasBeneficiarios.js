const sqlite3 = require('sqlite3');

function createTablePoliciesBeneficiaries(){
    const db = new sqlite3.Database("./backend/asegura2.sqlite3", sqlite3.OPEN_READWRITE, () => {
        db.run(
            `
                CREATE TABLE IF NOT EXISTS Polizas_Beneficiarios(
                    Id_Poliza_Beneficiario INTEGER PRIMARY KEY AUTOINCREMENT,
                    Id_Beneficiario INTEGER NOT NULL,
                    Id_Poliza INTEGER NOT NULL,
                    FOREIGN KEY (Id_Beneficiario) REFERENCES Beneficiarios(Id_Beneficiario) ON DELETE CASCADE,
                    FOREIGN KEY (Id_Poliza) REFERENCES Polizas(Id_Poliza) ON DELETE CASCADE
                )
            `
        )
    })
}

module.exports = {createTablePoliciesBeneficiaries}