require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const MySQLStore = require('express-mysql-session')
const options = {
   host: 'localhost',
   port: '3306',
   user: 'root',
   password: '',
   database: 'citas_db'
}
const sessionStore = new MySQLStore(options)

const app = express();

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
   key: 'cookie_usuario',
   secret: 'mySecretKey',
   store: sessionStore,
   resave: false,
   saveUninitialized: false
}))
// app.use((req, res) => {
//    res.status(404).render("404", {
//       "titulo": "404",
//       "descripcion": "Pagina Web no existe"
//    })
// })
app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
