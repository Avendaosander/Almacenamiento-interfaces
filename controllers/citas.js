class cita{
   constructor(req, res){
      this.nombre = req.body.nombre;
      this.apellido = req.body.apellido;
      this.cedula = req.body.cedula
      this.edad = req.body.edad
      this.fecha = req.body.fecha;
      this.hora = req.body.hora;
   }

   set Nombre(value){
      this.nombre = value
   }
   set Apellido(value){
      this.apellido = value
   }
   set Fecha(value){
      this.fecha = value
   }
   set Hora(value){
      this.hora = value
   }
   set Cedula(value){
      this.cedula = value
   }
   set Edad(value){
      this.edad = value
   }
}

module.exports = { cita };