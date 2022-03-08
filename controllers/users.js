class usuario{
   constructor(req, res){
      this.nombre = req.body.nombre;
      this.apellido = req.body.apellido;
      this.email = req.body.email;
      this.password = req.body.password;
      this.cedula = req.body.cedula
      this.edad = req.body.edad
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
      this.telefono = req.body.telefono;
   }

   set Telefono(value){
      this.telefono = value
   }
}

module.exports = { usuario, usaurioAdmin };