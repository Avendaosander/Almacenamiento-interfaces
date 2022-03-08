const express = require('express');
const router = express.Router();
const { validarUser, validarCampos, validarUpdate } = require('../validators/validator')
const { tablesUsers, tablesCitas, tablesAdmins } = require('../db/db');

/* GET home page. */
router.get('/home/:rol', function(req, res) { /* rol = Admin || User */
  res.render('index', { title: req.params.rol=='admin'?'Administrador':'Usuario', rol: req.params.rol});
});

router.get('/register', (req, res) => {
  res.status(200).render('register', { title: 'Registrar nuevo usuario'})
})

router.post('/register', validarUser, (req, res) => {
  const { nombre, apellido, edad, cedula, email, password } = req.body
  if (typeof req.body.telefono !== 'undefined' && req.body.telefono !== '') {
    const { telefono } = req.body
    console.log(telefono)
    tablesAdmins.admins.findOrCreate({
      where: {
        CedulaUser:cedula
      },
      defaults: {
        NombreUser:nombre, ApellidoUser:apellido, EmailUser:email, PasswordUser:password, CedulaUser:cedula, EdadUser:edad, TelefonoUser:telefono
      }
    }).then(([user, created])=>{
      if (created) {
        res.status(200).render('index', { title: 'Administrador', rol: 'admin'});
      } else {
        res.status(400).render('register', { title: 'Registrar un nuevo Administrador', error: 'El Administrador de cedula: '+user.dataValues.CedulaUser+' ya está registrado en el sistema' });
      }
    }).catch((err)=>{
      res.status(500).render('error', { user:'', users: [], error: err });
    })
  } else{
    tablesUsers.users.findOrCreate({
      where: {
        EmailUser:email ,CedulaUser:cedula
      },
      defaults: {
        NombreUser:nombre, ApellidoUser:apellido, EmailUser:email, PasswordUser:password, CedulaUser:cedula, EdadUser:edad
      }
    }).then(([user, created])=>{
      if (created) {
        res.status(200).render('index', { title: 'Usuario', rol: 'user'});
      } else {
        res.status(400).render('register', { title: 'Registrar un nuevo usuario', error: 'El usuario de cedula: '+user.dataValues.CedulaUser+' ya está registrado en el sistema' });
      }
    }).catch((err)=>{
      res.status(500).render('error', { user:'', users: [], error: err });
    })
  }

})

router.get('/login', function(req, res) {
  res.render('login', { title: 'Iniciar Sesion' });
});

router.post('/login', function(req, res) {
  if(req.body.EmailUser && req.body.PasswordUser) {
    tablesUsers.users.findAll({
      where: { EmailUser: req.body.EmailUser }
    }).then(([citaData])=>{
      if (citaData.dataValues.EmailUser === req.body.EmailUser && citaData.dataValues.PasswordUser === req.body.PasswordUser) {
        res.status(200).render('index', { title: "Bienvenido", rol: 'user'});
      }
    }).catch((err)=>{
      res.status(500).render('error', { user:'', users: [], error: err });
    })
  }
});

router.get('/citas', function(req, res) {
  tablesCitas.citas.findAll({
    attributes: [ 'NombreCita','ApellidoCita','CedulaCita','EdadCita','FechaCita','HoraCita' ],
    order: [
      ['EdadCita', 'DESC']
    ],
    raw: true
  }).then((citaData)=>{
    console.log(citaData)
    res.status(200).render('citas', { title: 'Citas Próximas', citas: citaData, error: ''});
  }).catch((err)=>{
    res.render('error', { citas: [], error: err });
  })
});

router.get('/crear-cita', (req, res) => {
  res.status(200).render('new-citas', { title: 'Crear una nueva cita'})
})

router.post('/crear-cita', validarCampos, (req, res) => {
  const { nombre, apellido, cedula, edad, fecha, hora } = req.body

  tablesCitas.citas.findOrCreate({
    where: {
      CedulaCita:cedula
    },
    defaults: {
      NombreCita:nombre, ApellidoCita:apellido, CedulaCita:cedula, EdadCita:edad, FechaCita:fecha, HoraCita:hora
    }
  }).then(([cita, created])=>{
    console.log(created)
    if (created) {
      tablesCitas.citas.findAll({
        attributes: [ 'NombreCita','ApellidoCita','CedulaCita','EdadCita','FechaCita','HoraCita' ],
        order: [
          ['EdadCita', 'DESC']
        ],
        raw: true
      }).then((citaData)=>{
        res.status(200).render('citas', { title: 'Citas Próximas', cita: cita , citas: citaData, error: ''});
      }).catch((err)=>{
        res.status(500).render('error', { cita:'', citas: [], error: err });
      })
    } else {
      console.log(cita)
      res.status(400).render('new-citas', { title: 'Crear una nueva cita', error: 'El usuario de cedula: '+cita.dataValues.CedulaCita+' ya tiene una cita' });
    }
  }).catch((err)=>{
    res.status(500).render('error', { cita:'', citas: [], error: err });
  })
})

router.get('/editar-cita/:cedula', (req, res)=>{
  tablesCitas.citas.findAll({
    where: { CedulaCita: req.params.cedula }
  }).then(([citaData])=>{
    res.status(200).render('update-cita', { title: 'Editar Cita', citas: citaData.dataValues, error: ''});
  }).catch((err)=>{
    res.render('error', { citas: [], error: err });
  })
})

router.post('/editar-cita/:cedula/:rol', validarUpdate, async (req, res)=>{
  await tablesCitas.citas.update(req.body, {
    where: { CedulaCita: req.params.cedula }
  })
  res.status(200).render('index', { title: req.params.rol=='admin'?'Administrador':'Usuario', rol: req.params.rol})
})

router.get('/borrar-cita/:cedula/:rol', async (req, res)=>{
  await tablesCitas.citas.destroy({
    where: { CedulaCita: req.params.cedula }
  })
  res.status(200).render('index', { title: req.params.rol=='admin'?'Administrador':'Usuario', rol: req.params.rol})
})

router.get('/editar-user/:cedula', (req, res)=>{
  tablesUsers.users.findAll({
    where: { CedulaUser: req.params.cedula }
  }).then(([citaData])=>{
    res.status(200).render('update-user', { title: 'Editar Usuario', citas: citaData.dataValues, error: ''});
  }).catch((err)=>{
    res.render('error', { citas: [], error: err });
  })
})

router.post('/editar-user/:cedula', validarUpdate, async (req, res)=>{
  await tablesUsers.users.update(req.body, {
    where: { CedulaUser: req.params.cedula }
  })
  res.status(200).render('index', { title: 'Administrador', rol: 'admin'})
})

router.get('/borrar-cita/:cedula', async (req, res)=>{
  await tablesUsers.users.destroy({
    where: { CedulaUser: req.params.cedula }
  })
  res.status(200).render('index', { title: 'Administrador', rol: 'admin'})
})

module.exports = router;
