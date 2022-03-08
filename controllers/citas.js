class cita{
   constructor(req, res){
      this.nombre = req.body.nombreCita;
      this.apellido = req.body.apellidoCita;
      this.cedula = req.body.cedulaCita
      this.edad = req.body.edadCita
      this.fecha = req.body.fechaCita;
      this.hora = req.body.horaCita;
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
   set hora(value){
      this.hora = value
   }
   set Cedula(value){
      this.cedula = value
   }
   set Edad(value){
      this.edad = value
   }
}

class citaAdmin extends cita{
   constructor(req,res){
      super(req,res);
      this.prioridad = req.body.prioridadCita;
   }

   set Prioridad(value){
      this.prioridad = value
   }
}

module.exports = { cita, citaAdmin };