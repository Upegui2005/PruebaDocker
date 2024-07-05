const sqlite = require('sqlite3');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

let validacionCompleta = false;
const eliminar = {};

function numValidation(longitud) {
    let numeroValidacion = [];
    for (let i = 0; i < longitud; i++) {
        const digito = Math.floor(Math.random() * 10);
        numeroValidacion.push(digito);
    }
    return numeroValidacion.join('');
}

function crearUsuario(req, res) {
    const crear = new sqlite.Database('./backend/asegura2.sqlite3', sqlite.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }  
        const datos = [
            req.body.Numero_Documento,
            req.body.Nombre,
            req.body.Usuario,
            req.body.Correo,
            req.body.Fecha,
            req.body.Contraseña,
            req.body.Telefono,
            req.body.Direccion,
            req.body.Profesion,
            req.body.Tipo_Documento
        ];

        const query = `
            INSERT INTO Usuarios VALUES (?,?,?,?,?,?,?,?,?,0,?,1)
        `;

        if (req.body.Contraseña == req.body.ContraseñaValidar){
            crear.run(query, datos, function(err, row) {
                if (err) {
                    return console.error(err.message);
                } else {
                    console.log("Usuario insertado");
                    const longitudSecuencia = 6;
                    const numero = numValidation(longitudSecuencia);
                    req.session.userId = [
                        numero,
                        req.body.Correo,
                        req.body.Numero_Documento
                    ];
                    EnviarCorreo(req.body.Correo, `Tu numero de confirmacion es: ${numero}`);
                    console.log(req.session.userId[0]);
                    console.log(req.session.userId[1]);

                    // Programar eliminación del usuario después de 5 minutos si no se valida
                    const timerEliminar = setTimeout(() => {
                        if (!validacionCompleta) {
                            eliminarUsuario(crear, req.session.userId[1]); // Llamar a la función para eliminar usuario
                        }
                    }, 5 * 60 * 1000); // 5 minutos en milisegundos

                    // Almacenar el temporizador en el objeto de tareas por correo electrónico
                    eliminar[req.session.userId[1]] = { timer: timerEliminar};
                }
            });   
        }
        else{
            console.log('Las contraseñas no coinciden')
            crear.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Conexión cerrada');
            });
        }
    });
}

function validateUser(req, res) {
    const validate = new sqlite.Database('./backend/asegura2.sqlite3', sqlite.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }

        const dataValidation = req.body.Codigo_Confirmacion

        console.log(dataValidation);

        const num = req.session.userId[0] ? req.session.userId[0]: [];
        
        console.log('Hi' + num)

        const igual = dataValidation === num;

        console.log(igual);

        if (igual) {
            validate.run(
                `
                    UPDATE Usuarios SET Validacion = true WHERE DNI = ?
                `, [req.session.userId[2]], function(err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log("Validacion actualizada");
                            if (eliminar[req.session.userId[1]] && eliminar[req.session.userId[1]].timer) {
                                clearTimeout(eliminar[req.session.userId[1]].timer); // Cancelar la eliminación programada
                                delete eliminar[req.session.userId[1]]; // Eliminar la referencia del objeto de eliminación
                            } // Eliminar la referencia del objeto de tareas
                            validacionCompleta = true;
                            logout(req, res);
                        }
                });
        }
        else{
            console.error('Error');
        }
    })
}

function EnviarCorreo(destinatario, mensaje) {
    const correo = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:"asegura2.2024@gmail.com",
            pass: "pitx nuxa lild cqmy",
        },
    });
    const opcionesCorreo = {
        from : "asegura2.2024@gmail.com", //remitente
        to: destinatario, //destinatario
        subject: "Codigo de verificación", //asunto
        html: mensaje //cuerpo del correo
    }
    correo.sendMail(opcionesCorreo, (err, info) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Correo enviado "+ info.response);
        };
    });
};

function logout(req, res) {
    req.session = null;
    res.clearCookie('sessionId');
    res.send('Logout Exitoso')
}

function eliminarUsuario(db, correo) {
    db.run(`
        DELETE FROM Usuarios WHERE Email = ? AND Validacion = 0
    `, [correo], function(err) {
        if (err) {
            console.error('Error al eliminar usuario no validado:', err.message);
        } else {
            console.log(`Usuario no validado eliminado`);
        }
        db.close(); // Cerrar la base de datos después de la operación
    });
}

function email(req, res) {
    EnviarCorreo(req.session.userId[1], `Tu numero de confirmacion es: ${req.session.userId[0]}`);
};

module.exports = { crearUsuario, validateUser, email };
