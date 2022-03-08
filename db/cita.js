const { DataTypes } = require('sequelize')

module.exports = (connection) => {
   const citas = connection.define('citas', {
      IDCita: {
         type: DataTypes.INTEGER(11),
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      NombreCita: {
         type: DataTypes.STRING(255),
         allowNull: false
      },
      ApellidoCita: {
         type: DataTypes.STRING(255),
         allowNull: false
      },
      CedulaCita: {
         type: DataTypes.INTEGER(11),
         allowNull: false
      },
      EdadCita: {
         type: DataTypes.INTEGER(2),
         allowNull: false
      },
      FechaCita: {
         type: DataTypes.DATEONLY(11),
         allowNull: false
      },
      HoraCita: {
         type: DataTypes.TIME(11),
         allowNull: false
      }
   },{
      createdAt:"CreatedCitaDate",
      indexes: [
         {
            unique: true,
            fields:['CedulaCita']
         }
      ]
   })
   return { citas }
}