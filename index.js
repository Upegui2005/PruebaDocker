const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const session = require('./backend/session')
const loginRouter = require('./backend/router/loginRouter');
const registerRouter = require('./backend/router/registerRouter');
const homeRouter = require('./backend/router/homeRouter');
require('dotenv').config();

const app = express();
const {db} = require('./backend/db/db')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors()); 
app.use(cookieParser());
app.use(session);
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.set('port', process.env.PORT || 9191);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});
//app.use('/pdf', express.static(path.join(__dirname, 'pdf')));
app.use('', loginRouter);
app.use('/registro', registerRouter);
app.use('/home', homeRouter);

async function StartServer() {
    try {
        await db;
        app.listen(app.get('port'), () =>{
            console.log('Server active', app.get('port'));
        }) 
    } catch (error) {
        console.error("error"+error);
    }
}

StartServer();