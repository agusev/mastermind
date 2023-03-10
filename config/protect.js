// verifies that user is authenticated for protected routes

const protect = (req, res, next) => {
	if (req.session.authenticated) {
		next();
	} else {
		res.redirect('auth');
	}
};

module.exports = protect;
