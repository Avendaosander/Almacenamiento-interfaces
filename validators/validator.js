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
   body('NombreUser', "Ingrese el nombre")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El nombre no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('ApellidoUser', "Ingrese el apellido")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El apellido no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('CedulaUser', "Ingrese su cedula")
      .exists(),
   body('EdadUser', "Ingrese su edad")
      .exists(),
   body('FechaUser', "Ingrese la fecha de su cita")
      .exists(),
   body('HoraUser', "Ingrese la hora de su cita")
      .exists(),
   (req,res,next) => {
      validationCreate(req, res, next)
   }
]

module.exports = { validarUser, validarCampos, validarUpdate }