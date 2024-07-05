const sqlite3 = require('sqlite3');
const nodemailer = require('nodemailer');

function homeLogin(req, res) {
    res.render('iniciosesion')
}

function login(req, res) {
    const db = new sqlite3.Database("./backend/asegura2.sqlite3", sqlite3.OPEN_READONLY, () => {
        const datos = [
            req.body.NombreUsuario, 
            req.body.Contraseña
        ]
        const buscar = `SELECT * FROM Usuarios WHERE Nombre_Usuario = ? AND Contraseña = ? AND Validacion = 1`;
        db.get(buscar, datos, function(err, row){
            console.log(row);
            if(err){
                console.error('Error al buscar el usuario en la DB', err);
                res.status('Error Interno');
                return;
            }
            else if (row){
                req.session.userId = [
                    row.DNI,
                    row.Nombre_Usuario,
                    row.Nombre
                ];
                console.log('Inicio')
                res.send('Inicio')
                console.log(req.session.userId[0])
            }
            else {
                res.status(404).send('Incorrecto') 
            }
            db.close();
        });
    });
};

function logout(req, res) {
    req.session = null;
    res.clearCookie('sessionId');
    res.send('Logout Exitoso')
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
        subject: "Recuperación contraseña", //asunto
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

function email(req, res) {
    const db = new sqlite3.Database("./backend/asegura2.sqlite3", sqlite3.OPEN_READONLY, () => {
        const datos = [
            req.body.Correo
        ]
        const busqueda = `SELECT * FROM Usuarios WHERE Email = ? AND Validacion = 1`;
        db.get(busqueda, datos, function(err, row) {
            if (err) {
                console.error(err.message);
                res.status(500).send('Error en el servidor');
            } else if (!row) {
                res.status(401).send('Email incorrectos');
            } else {
              EnviarCorreo(req.body.Correo, 'http://localhost:9090/Reestablecer');
              req.session.userId = req.body.Correo
              console.log(req.session.userId);
            };
        });
    });
};

function cambiarContraseña(req, res) {
    const cambiar = new sqlite3.Database('./backend/asegura2.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            res.status(404).send('Contraseñas diferentes') 
        }

        const password = req.body.Nueva_Contraseña

        const confirmarPassword = req.body.Validar_Contraseña

        const email = req.session.userId

        console.log(email)
        
        const igual = password === confirmarPassword

        if(igual){
            cambiar.run(
                `
                    UPDATE Usuarios SET Contraseña = ? WHERE Email = ? 
                `, [password, email], (err) =>{
                    if(err){
                        res.statusCode(400).send('Error al actualizar');
                    } else {
                        console.log('Actualiazción correcta')
                        res.send('Actualizado')
                    }
                }
            )
        }else{
            res.status(406).send('Contraseñas diferentes') 
        }
    })
}

module.exports = {login, email, homeLogin, logout, cambiarContraseña};


