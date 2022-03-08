const { DataTypes } = require('sequelize')

module.exports = (connection) => {
   const admins = connection.define('admins', {
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
      EmailUser: {
         type: DataTypes.STRING(255),
         allowNull: false
      },
      PasswordUser: {
         type: DataTypes.STRING(255),
         allowNull: false
      },
      CedulaUser: {
         type: DataTypes.INTEGER(11),
         allowNull: false
      },
      EdadUser: {
         type: DataTypes.INTEGER(2),
         allowNull: false
      },
      TelefonoUser: {
         type: DataTypes.STRING(255),
         allowNull: false
      }
   },{
      createdAt:"CreatedUserDate",
      indexes: [
         {
            unique: true,
            fields:['CedulaUser']
         }
      ]
   })
   return { admins }
}