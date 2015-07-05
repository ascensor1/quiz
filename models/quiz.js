// Definicion del modelo de Quiz con validacion

// module.exports = function(sequelize, DataTypes) {
// 	return sequelize.define('Quiz',
// 			{ pregunta:  DataTypes.STRING,
// 			respuesta: DataTypes.STRING,
// 	});
// } 


module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
  	'Quiz',
    { pregunta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Pregunta"}}
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Respuesta"}}
      }
    }
  );
}
