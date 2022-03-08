const { body } = require('express-validator')
const { validationCreate } = require('../helpers/ValidatorHelper')

const validarCampos = [
   body('nombre', "Ingrese el nombre")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El nombre no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('apellido', "Ingrese el apellido")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El apellido no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('cedula', "Ingrese su cedula")
      .exists(),
   body('edad', "Ingrese su edad")
      .exists(),
   body('fecha', "Ingrese la fecha de su cita")
      .exists(),
   body('hora', "Ingrese la hora de su cita")
      .exists(),
   (req,res,next) => {
      validationCreate(req, res, next)
   }
]

const validarUser = [
   body('nombre', "Ingrese el nombre")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El nombre no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('apellido', "Ingrese el apellido")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El apellido no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('cedula', "Ingrese su cedula")
      .exists(),
   body('edad', "Ingrese su edad")
      .exists(),
   body('email', 'Ingrese un Email valido')
      .exists()
      .isEmail(),
   body('password', 'Ingrese una Contraseña valida')
      .exists()
      .isStrongPassword()
]

const validarUpdate = [
   body('NombreCita', "Ingrese el nombre")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El nombre no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('ApellidoCita', "Ingrese el apellido")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El apellido no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('CedulaCita', "Ingrese su cedula")
      .exists(),
   body('EdadCita', "Ingrese su edad")
      .exists(),
   body('FechaCita', "Ingrese la fecha de su cita")
      .exists(),
   body('HoraCita', "Ingrese la hora de su cita")
      .exists(),
   (req,res,next) => {
      validationCreate(req, res, next)
   }
]

const validarUpdateUser = [
   body('nombre', "Ingrese el nombre")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El nombre no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('apellido', "Ingrese el apellido")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El apellido no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('cedula', "Ingrese su cedula")
      .exists(),
   body('edad', "Ingrese su edad")
      .exists(),
   body('email', 'Ingrese un Email valido')
      .exists()
      .isEmail(),
   body('password', 'Ingrese una Contraseña valida')
      .exists()
      .isStrongPassword()
]

module.exports = { validarUser, validarCampos, validarUpdate, validarUpdateUser }