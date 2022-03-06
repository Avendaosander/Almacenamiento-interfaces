const { DataTypes } = require('sequelize')

module.exports = (connection) => {
   const users = connection.define('users', {
      IDUser: {
         type: DataTypes.INTEGER(11),
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      NombreUser: {
         type: DataTypes.STRING(255),
         allowNull: false
      },
      ApellidoUser: {
         type: DataTypes.STRING(255),
         allowNull: false
      },
      EdadUser: {
         type: DataTypes.NUMBER(2),
         allowNull: false
      },
      FechaUser: {
         type: DataTypes.NUMBER(11),
         allowNull: false
      },
      HoraUser: {
         type: DataTypes.NUMBER(11),
         allowNull: false
      }
   },{
      createdAT:"CreatedUserDate",
      indexes: [
         {
            unique: true,
            fields:['IDUser']
         }
      ]
   })
   return { users }
}