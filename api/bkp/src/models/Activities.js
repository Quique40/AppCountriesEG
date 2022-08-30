const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activities', {
    
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: true
    },
    name:{
      type: DataTypes.STRING, 
      unique:true,
      allowNull: true
    },
    difficulty:{
      type: DataTypes.ENUM,
      values: ["1","2","3","4","5"],
      allowNull: true
    },
    duration:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    season:{
      type: DataTypes.ENUM,
      values: ["Summer", "Fall", "Winter", "Spring"],
      allowNull: true      
    },
    description:{
      type: DataTypes.STRING
    }
  },{
    timestamps: false
  });
};



// - Actividad Turística con las siguientes propiedades:
// ID
// Nombre
// Dificultad (Entre 1 y 5)
// Duración
// Temporada (Verano, Otoño, Invierno o Primavera)