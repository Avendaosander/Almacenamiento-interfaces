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
   body('email', 'Ingrese un Email valido')
      .exists()
      .isEmail(),
   body('password', 'Ingrese una Contraseña valida')
      .exists()
      .isStrongPassword()
]

const validarUpdate = [
   body('titulo', "Ingrese un Titulo para el articulo")
      .custom( value => {
         if(typeof value === 'undefined'){
            return true
         } else {
            if(value.length > 5) {
               return true
            } else {
               throw new Error('El Tiulo es muy corto')
            }
         }
      }),
   body('subtitulo', "Ingrese un Subtitulo para el articulo")
      .custom( value => {
         if(typeof value === 'undefined'){
            return true
         } else {
            if(value.length > 5) {
               return true
            } else {
               throw new Error('El Subtitulo es muy corto')
            }
         }
      }),
   body('autor', "Ingrese el Autor del articulo")
      .custom( value => {
         if (typeof value === 'undefined') {
            return true
         } else {
            if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value) || value.length > 2) {
               return true
            } else {
               throw new Error('El nombre del autor no es valido, ingrese solo letras')
            }
         }
      }),
   body('cuerpo', "Ingrese el contenido del articulo")
      .custom( value => {
         if(typeof value === 'undefined'){
            return true
         } else {
            if (new URL(value)) {
               return true
            } else {
               if(value.length > 5) {
                  return true
               } else {
                  throw new Error('El cuerpo del articulo es muy corto')
               }
            }
         }
      }),
   body('enlaces', "Ingrese al menos un enlace bibliografico")
      .custom( value => {
         if (typeof value === 'undefined') {
            return true
         } else {
            try {
               new URL(value)
               return true
            } catch (error) {
               return false
            }
         }
      }),
   (req,res,next) => {
      validationCreate(req, res, next)
   }
]

module.exports = { validarUser, validarCampos, validarUpdate }