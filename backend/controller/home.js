const sqlite = require('sqlite3');
const pdf = require('pdfkit');
const path = require('path');
const fs = require('fs');
const { json } = require('express');

function home(req, res) {
    const home = new sqlite.Database('./backend/asegura2.sqlite3', sqlite.OPEN_READONLY, (err) => {
        if (err) {
            return console.error(err.message);
        }
        home.all(
            `
                SELECT * FROM Seguros
            `,(err, rows) =>{
                if(err){
                    console.error(err.message);
                    return res.status(500).json({ error: 'Error al consultar la base de datos' });
                }
                else{
                    console.log(rows);
                    res.json(rows);
                }
            }

            )
        home.close((err) => {
            if (err) {
              console.error(err.message);
            }
        });
    });
}


function myInsurances(req, res) {
    const insurences = new sqlite.Database('./backend/asegura2.sqlite3', sqlite.OPEN_READONLY, (err) =>{
        if(err){
            console.error(err.message);
        }
        insurences.all(
            `
                SELECT p.Id_Poliza as ID, p.Fecha_Inicio as Inicio, p.Fecha_Fin as Fin, s.Nombre_Seguro  from Polizas p 
                INNER JOIN Seguros s ON s.Id_Seguro = p.Id_Seguro WHERE p.DNI = ?;
            `,[req.session.userId[0]],(err, rows) =>{
                if (err){
                    console.error(err);
                }
                else{
                    console.log(rows)
                    res.json(rows)
                }
                insurences.close();
            }
        );
    });
}

function detalleSeguro(req, res){
    const { idPoliza } = req.body;

    const detalle = new sqlite.Database('./backend/asegura2.sqlite3', sqlite.OPEN_READONLY, (err) => {
        if(err){
            console.error(err.message);
        }
        detalle.get(
            `
                SELECT s.Cobertura, s.Limite, p.Id_Poliza from Seguros s INNER JOIN Polizas p on p.Id_Seguro = s.Id_Seguro  
                WHERE p.Id_Poliza = ?;
            `,[idPoliza],(err, rows) =>{
                if(err){
                    console.error('Error: '+err);
                }
                else if(rows){
                    console.log(rows)
                    res.json(rows);
                }
                else{
                    console.log('No hay datos');
                }
                detalle.close(), (err) =>{
                    if (err){
                        console.error(err);
                    }
                    else{
                        console.log('DB Cerrada')
                    }
                };
            }
        )
    })
}

function beneficiarios(req, res) {
    const { idPoliza } = req.body;

    const beneficiario = new sqlite.Database('./backend/asegura2.sqlite3', sqlite.OPEN_READONLY, (err) =>{
        if(err){
            console.log(err.message)
        }
        beneficiario.all(
            `
                SELECT b.Nombre FROM Polizas_Beneficiarios pb INNER JOIN Beneficiarios b ON pb.Id_Beneficiario = b.Id_Beneficiario 
                INNER JOIN Polizas p ON pb.Id_Poliza = p.Id_Poliza  WHERE pb.Id_Poliza  = ?;
            `,[idPoliza],(err, rows) =>{
                if(err){
                    console.error(err.message);
                }
                else if(rows){
                    console.log(rows);
                    res.json(rows);
                }
                else{
                    console.log('No hay datos');
                }
                beneficiario.close(), (err) =>{
                    if (err){
                        console.error(err);
                    }
                    else{
                        console.log('DB Cerrada')
                    }
                };
            }
        )
    })
}

function pdfSeguro(req, res) {
    const { idPoliza } = req.body;

    const dbPath = './backend/asegura2.sqlite3';
    const outputPath = path.resolve(__dirname, '../pdf/certificado.pdf'); // Ruta absoluta donde se guardará el PDF

    // Crear carpeta pdf si no existe
    const pdfDir = path.dirname(outputPath);
    if (!fs.existsSync(pdfDir)) {
        fs.mkdirSync(pdfDir, { recursive: true });
    }

    const crearPdf = new sqlite.Database(dbPath, sqlite.OPEN_READONLY, (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Error al conectar con la base de datos' });
        }
        
        crearPdf.get(
            `
                SELECT p.Fecha_Inicio, p.Fecha_Fin, s.Nombre_Seguro, s.Cobertura, s.Limite, u.Nombre, u.DNI FROM Polizas p 
                INNER JOIN Seguros s ON s.Id_Seguro = p.Id_Seguro 
                INNER JOIN Usuarios u ON u.DNI = p.DNI WHERE p.Id_Poliza = ?
            `,
            [idPoliza],
            (err, polizaRow) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ error: 'Error al obtener datos de la base de datos' });
                }

                crearPdf.all(
                    `
                        SELECT b.Documento, b.Nombre as Nombre_Beneficiario
                        FROM Polizas_Beneficiarios pb 
                        INNER JOIN Beneficiarios b ON pb.Id_Beneficiario = b.Id_Beneficiario 
                        WHERE pb.Id_Poliza = ?;
                    `,
                    [idPoliza],
                    (err, beneficiariosRows) => {
                        if (err) {
                            console.error(err.message);
                            return res.status(500).json({ error: 'Error al obtener datos de la base de datos' });
                        }

                        const doc = new pdf();
                        const stream = fs.createWriteStream(outputPath);

                        doc.pipe(stream);

                        // Información general de la póliza y seguro (imprimir una vez)
                        doc.fontSize(12).text('Certificado de Póliza:', { align: 'center' });
                        doc.moveDown();
                        doc.text(`Seguro de: ${polizaRow.Nombre_Seguro}`);
                        doc.text(`Cobertura: ${polizaRow.Cobertura}`);
                        doc.text(`Límite: ${polizaRow.Limite}`);
                        doc.moveDown();

                        doc.text(`Nombre titular: ${polizaRow.Nombre} ----- Documento del titular: ${polizaRow.DNI}`);
                        doc.moveDown();

                        // Listar beneficiarios
                        beneficiariosRows.forEach((beneficiario, index) => {
                            doc.text(`Nombre Beneficiario: ${beneficiario.Nombre_Beneficiario} ----- Documento del beneficiario: ${beneficiario.Documento}`);
                            if (index < beneficiariosRows.length - 1) {
                                doc.moveDown();
                            }
                        });

                        doc.end();

                        stream.on('finish', () => {
                            console.log(`PDF generado: ${outputPath}`);
                            // Enviar el archivo PDF al cliente
                            // En lugar de usar res.download
                            res.sendFile(outputPath, (err) => {
                                if (err) {
                                    console.error('Error al enviar el archivo:', err);
                                    res.status(500).json({ error: 'Error al enviar el archivo PDF' });
                                } else {
                                    console.log('Archivo enviado correctamente');
                                    // Opcional: Puedes eliminar el archivo después de enviarlo
                                    // fs.unlinkSync(outputPath);
                                }
                            });

                        });
                    }
                );
            }
        );
    });
}


function pagos(req, res) {
    const {idPoliza} = req.body;

    const pago = new sqlite.Database('./backend/asegura2.sqlite3', sqlite.OPEN_READONLY, (err) => {
        if(err){
            console.log(err.message)
        }
        pago.all(
            `
                SELECT p.Fecha_Pago FROM Pagos p WHERE Id_Poliza = ?;
            `, [idPoliza], (err, rows) => {
                if(err){
                    console.error(err.message);
                }
                else if(rows){
                    console.log(rows);
                    res.json(rows);
                }
                else{
                    console.log('No hay datos');
                }
                pago.close(), (err) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log('DB Cerrada')
                    }
                }
            }
        )
    })
}

function proximoPago(req, res){
    const {idPoliza} = req.body;

    const fecha = new sqlite.Database('./backend/asegura2.sqlite3', sqlite.OPEN_READONLY, (err) => {
        if(err){
            console.error(err.message);
            return res.status(500).json({ error: 'Error al conectar con la base de datos' });
        }

        fecha.get(
            `
                SELECT MAX(Fecha_Pago) as Fecha FROM Pagos p WHERE Id_Poliza = ?
            `,[idPoliza], (err, row) =>{
                if(err){
                    console.error(err.message);
                }else{
                    console.log(row.Fecha)

                    const fechaInicial = new Date(row.Fecha);

                    // Obtener el mes y año de la fecha inicial
                    const mesInicial = fechaInicial.getMonth();
                    const añoInicial = fechaInicial.getFullYear();

                    // Calcular el mes siguiente y manejar el cambio de año si es necesario
                    let nuevoMes;
                    let nuevoAño = añoInicial;

                    if (mesInicial === 11) { // Si el mes actual es diciembre (11 en JavaScript)
                        nuevoMes = 0; // El siguiente mes es enero
                        nuevoAño++; // Aumentar el año en uno
                    } else {
                        nuevoMes = mesInicial + 1; // Avanzar al siguiente mes
                    }

                    // Crear la nueva fecha con el mes y año calculados
                    const fechaCalculada = new Date(nuevoAño, nuevoMes, 30); // Establecer el día en 1

                    // Obtener día, mes y año de la fecha calculada
                    const dia = fechaCalculada.getDate().toString().padStart(2, '0');
                    const mes = (fechaCalculada.getMonth() + 1).toString().padStart(2, '0');
                    const año = fechaCalculada.getFullYear();

                    // Formatear la fecha como dd-mm-yyyy
                    const fechaFormateada = `${año}-${mes}-${dia}`;

                    res.json(fechaFormateada);
                }
            }
        )
    })
}

module.exports = {home, myInsurances, detalleSeguro, beneficiarios, pdfSeguro, pagos, proximoPago};