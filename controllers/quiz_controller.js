var models = require('../models/models.js');


// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};



// // GET /quizes/question
// exports.question = function(req, res) {
// // 	res.render('quizes/question', {pregunta: 'Capital de Italia',title: 'Pregunta'});
// 	models.Quiz.findAll().then(function(quiz) {
// 		res.render('quizes/question', { pregunta: quiz[0].pregunta});
// 	})
// };


// GET /quizes
exports.index = function(req, res) {
// 	models.Quiz.findAll().success(function(quiz) {
// 	models.Quiz.findAll().then(function(quizes) {
// 		res.render('quizes/index.ejs', { quizes: quizes});
// 	})
	if (!req.query.search) {
		models.Quiz.findAll().then(
				function(quizes) {
					var busqueda = 'Buscar pregunta';
					res.render('quizes/index', { quizes: quizes, busqueda: busqueda});
				}
			).catch(function(error) { next(error);})
	} else {
    // delimitar el string contenido en search con el comodín % antes y después cambie también
    // los espacios en blanco por %. De esta forma, si busca "uno dos" ("%uno%dos%"),
    // mostrará todas las preguntas que tengan "uno" seguido de "dos", independientemente
    // de lo que haya entre "uno" y "dos".
    models.Quiz.findAll(
      {
        where: [ "lower(pregunta) like lower(?)", "%" + req.query.search.split(" ").join("%") + "%" ]
      }).then( function(quizes) {
		var busqueda = req.query.search;
        res.render( 'quizes/index', { quizes: quizes.sort(), busqueda: busqueda});
      }
    ).catch(function(error) {next(error);})
	}

};

// GET /quizes/answer
// exports.answer = function(req, res) {
// 	if (req.query.respuesta === 'Roma'){
// 		res.render('quizes/answer', {respuesta: 'Correcto',title: 'Respuesta'});
// 	} else {
// 		res.render('quizes/answer', {respuesta: 'Incorrecto. La respuesta era "Roma"',title: 'Respuesta'});
// 	}

// GET /quizes/:id
exports.show = function(req, res) {
//   models.Quiz.find(req.params.quizId).then(function(quiz) {
//     res.render('quizes/show', { quiz: quiz});
//   })
  res.render('quizes/show', { quiz: req.quiz});
};


// GET /quizes/:id/answer
 exports.answer = function(req, res) {
//   models.Quiz.find(req.params.quizId).then(function(quiz) {
//     if (req.query.respuesta === quiz.respuesta) {
//       res.render('quizes/answer', 
//                  { quiz: quiz, respuesta: 'Correcto' });
//      } else {
//       res.render('quizes/answer', 
//                  { quiz: quiz, respuesta: 'Incorrecto'});
//      }
//    })
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
 };

// GET /author
exports.author = function(req, res) {
	res.render("author", {});
};
