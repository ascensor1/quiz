// GET /quizes/question
exports.question = function(req, res) {
	res.render('quizes/question', {pregunta: 'Capital de Italia',title: 'Pregunta'});
};

// GET /quizes/answer
exports.answer = function(req, res) {
	if (req.query.respuesta === 'Roma'){
		res.render('quizes/answer', {respuesta: 'Correcto',title: 'Respuesta'});
	} else {
		res.render('quizes/answer', {respuesta: 'Incorrecto. La respuesta era "Roma"',title: 'Respuesta'});
	}
};

// GET /author
exports.author = function(req, res) {
	res.render("author", {title: "Créditos"});
};
