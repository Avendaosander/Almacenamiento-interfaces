class usuario{
   constructor(req, res){
      this.nombre = req.body.nombreUser;
      this.apellido = req.body.apellidoUser;
      this.email = req.body.emailUser;
      this.password = req.body.passwordUser;
      this.cedula = req.body.cedulaUser
      this.edad = req.body.edadUser
   }

   set Nombre(value){
      this.nombre = value
   }
   set Apellido(value){
      this.apellido = value
   }
   set Email(value){
      this.email = value
   }
   set Password(value){
      this.password = value
   }
   set Cedula(value){
      this.cedula = value
   }
   set Edad(value){
      this.edad = value
   }
}

class usaurioAdmin extends usuario{
   constructor(req,res){
      super(req,res);
      this.telefono = req.body.telefonoUser;
   }

   set Telefono(value){
      this.telefono = value
   }
}

module.exports = { usuario, usaurioAdmin };