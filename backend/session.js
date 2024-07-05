const cookieParser = require('cookie-parser');
const uuid = require('uuid');

const sessions = {};

function session(req, res, next) {
    // Parsear cookies
    cookieParser()(req, res, () => {
        // Verificar si existe una sesión válida
        let sessionId = req.cookies.sessionId;
        if (!sessionId || !sessions[sessionId]) {
            // Si no hay sesión válida, crear una nueva
            sessionId = uuid.v4(); // Generar un nuevo ID de sesión
            sessions[sessionId] = {}; // Inicializar datos de sesión vacíos
            res.cookie('sessionId', sessionId, { httpOnly: true }); // Establecer cookie con el ID de sesión
        }

        // Adjuntar objeto de sesión al objeto de solicitud para facilitar el acceso
        req.session = sessions[sessionId];

        // Continuar con el siguiente middleware
        next();
    });
}

module.exports = session;
