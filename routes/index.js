const express = require('express');
const router = express.Router();
const { validarUser, validarCampos, validarUpdate } = require('../validators/validator')
const { tables } = require('../db/db')

let citas = []
let users = []

/* GET home page. */
router.get('/home/admin', function(req, res) {
  res.render('index', { title: 'Administrador' });
});

router.get('/home/user', function(req, res) {
  res.render('index', { title: 'Usuario' });
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Iniciar Sesion' });
});

router.get('/user', function(req, res) {
  res.render('index', { title: 'Express - NodeJS - EJS - MysQL' });
});

router.get('/citas', function(req, res) {
  console.log(citas)
  res.render('citas', { title: 'Citas Próximas', citas });
});

router.get('/register', (req, res) => {
  // require('../db')
  res.status(200).render('register', { title: 'Registrar nuevo usuario'})
})
router.post('/register', validarUser, (req, res) => {
  const { nombre, apellido, edad, email, password } = req.body
  let newUser = {nombre, apellido, edad, email, password}
  users.push(newUser)
  res.status(200).redirect('/user')
})

router.get('/crear-cita', (req, res) => {
  // require('../db')
  res.status(200).render('new-citas', { title: 'Crear una nueva cita'})
})

router.post('/crear-cita', validarCampos, (req, res) => {
  const { nombre, apellido, edad, fecha, hora } = req.body
  let newCita = { nombre, apellido, edad, fecha, hora }
  citas.push(newCita)
  res.status(200).redirect('/citas')
})

module.exports = router;
