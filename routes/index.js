const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const { tablesUsers, tablesCitas, tablesAdmins } = require('../db/db');
const { validarUser, validarCampos, validarUpdate, validarUpdateUser } = require('../validators/validator')
const { usuario, usaurioAdmin } = require('../controllers/users')
const { cita } = require('../controllers/citas')

/* GET home page. */
router.get('/home/:rol', function(req, res) { /* rol = Admin || User */
  res.render('index', { title: req.params.rol=='admin'?'Administrador':'Usuario', rol: req.params.rol});
});

router.get('/register/:rol', (req, res) => {
  res.status(200).render('register', { title: 'Registrar nuevo usuario', rol: req.params.rol})
})

router.post('/register/:rol', validarUser, (req, res) => {
  if (req.params.rol === 'admin') {
    let UserAdminClass = new usaurioAdmin(req, res)
    let passwordHash = bcrypt.hashSync(UserAdminClass.password, 10);
    tablesAdmins.admins.findOrCreate({
      where: {
        EmailUser:UserAdminClass.email, CedulaUser:UserAdminClass.cedula
      },
      defaults: {
        NombreUser:UserAdminClass.nombre, ApellidoUser:UserAdminClass.apellido, EmailUser:UserAdminClass.email, PasswordUser:passwordHash, CedulaUser:UserAdminClass.cedula, EdadUser:UserAdminClass.edad, TelefonoUser:UserAdminClass.telefono
      }
    }).then(([user, created])=>{
      if (created) {
        res.status(200).render('index', { title: 'Administrador', rol: req.params.rol});
      } else {
        res.status(400).render('register', { title: 'Registrar un nuevo Administrador', error: 'El Administrador de cedula: '+user.dataValues.CedulaUser+' ya está registrado en el sistema' });
      }
    }).catch((err)=>{
      res.status(500).render('error', { user:'', users: [], error: err });
    })
  } else {
    let UserClass = new usuario(req, res)
    let passwordHash = bcrypt.hashSync(UserClass.password, 10);
    tablesUsers.users.findOrCreate({
      where: {
        EmailUser:UserClass.email ,CedulaUser:UserClass.cedula
      },
      defaults: {
        NombreUser:UserClass.nombre, ApellidoUser:UserClass.apellido, EmailUser:UserClass.email, PasswordUser:passwordHash, CedulaUser:UserClass.cedula, EdadUser:UserClass.edad
      }
    }).then(([user, created])=>{
      if (created) {
        res.status(200).render('index', { title: 'Usuario', rol: req.params.rol});
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
    if (req.body.rol === 'user') {
      tablesUsers.users.findAll({
        where: { EmailUser: req.body.EmailUser }
      }).then(([citaData])=>{
        bcrypt.compare(req.body.PasswordUser, citaData.dataValues.PasswordUser, function(err, resp) {
          if (resp) {
            res.status(200).render('index', { title: "Bienvenido", rol: req.body.rol});
          } else {
            res.status(500).render('error', { user:'', users: [], error: 'Contraseña es incorrecta' });
          }
        });
      }).catch((err)=>{
        res.status(500).render('error', { user:'', users: [], error: err });
      })
    } else {
      console.log(req.body)
      tablesAdmins.admins.findAll({
        where: { EmailUser: req.body.EmailUser }
      }).then(([citaData])=>{
        bcrypt.compare(req.body.PasswordUser, citaData.dataValues.PasswordUser, function(err, resp) {
          if (resp) {
            res.status(200).render('index', { title: "Bienvenido", rol: req.body.rol});
          } else {
            res.status(500).render('error', { user:'', users: [], error: 'Contraseña es incorrecta' });
          }
        });
      }).catch((err)=>{
        res.status(500).render('error', { user:'', users: [], error: err });
      })
    }
  }
});

router.get('/users/:rol', function(req, res) {
  tablesUsers.users.findAll({
    attributes: [ 'NombreUser','ApellidoUser','CedulaUser','EdadUser','EmailUser','PasswordUser' ],
    order: [
      ['CedulaUser', 'DESC']
    ],
    raw: true
  }).then((useData)=>{
    res.status(200).render('users', { title: 'Usuarios', users: useData, error: '', rol: req.params.rol});
  }).catch((err)=>{
    res.render('error', { users: [], error: err });
  })
});

router.get('/citas/:rol', function(req, res) {
  tablesCitas.citas.findAll({
    attributes: [ 'NombreCita','ApellidoCita','CedulaCita','EdadCita','FechaCita','HoraCita' ],
    order: [
      ['EdadCita', 'DESC']
    ],
    raw: true
  }).then((citaData)=>{
    res.status(200).render('citas', { title: 'Citas Próximas', citas: citaData, error: '', rol: req.params.rol});
  }).catch((err)=>{
    res.render('error', { citas: [], error: err });
  })
});

router.get('/crear-cita/:rol', (req, res) => {
  res.status(200).render('new-citas', { title: 'Crear una nueva cita', rol: req.params.rol})
})

router.post('/crear-cita/:rol', validarCampos, (req, res) => {
  let CitaClass = new cita(req, res)
  tablesCitas.citas.findOrCreate({
    where: {
      CedulaCita:CitaClass.cedula
    },
    defaults: {
      NombreCita:CitaClass.nombre, ApellidoCita:CitaClass.apellido, CedulaCita:CitaClass.cedula, EdadCita:CitaClass.edad, FechaCita:CitaClass.fecha, HoraCita:CitaClass.hora
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
        res.status(200).render('citas', { title: 'Citas Próximas', cita: cita , citas: citaData, error: '', rol: req.params.rol});
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

router.get('/editar-cita/:cedula/:rol', (req, res)=>{
  tablesCitas.citas.findAll({
    where: { CedulaCita: req.params.cedula }
  }).then(([citaData])=>{
    res.status(200).render('update-cita', { title: 'Editar Cita', citas: citaData.dataValues, error: '', rol: req.params.rol});
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

router.get('/editar-user/:cedula/:rol', (req, res)=>{
  tablesUsers.users.findAll({
    where: { CedulaUser: req.params.cedula }
  }).then(([userData])=>{
    res.status(200).render('update-user', { title: 'Editar Usuario', users: userData.dataValues, error: '', rol: req.params.rol});
  }).catch((err)=>{
    res.render('error', { users: [], error: err });
  })
})

router.post('/editar-user/:cedula/:rol', validarUpdateUser, async (req, res)=>{
  await tablesUsers.users.update(req.body, {
    where: { CedulaUser: req.params.cedula }
  })
  res.status(200).render('index', { title: 'Administrador', rol: req.params.rol})
})

router.get('/borrar-user/:cedula/:rol', async (req, res)=>{
  await tablesUsers.users.destroy({
    where: { CedulaUser: req.params.cedula }
  })
  res.status(200).render('index', { title: 'Administrador', rol: req.params.rol})
})

module.exports = router;
