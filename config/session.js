// configuration for express session

const session = require('express-session');

const sessionInstance = session({
	secret: 'akhrglkahdfklahdfglkhadflkg',
	cookie: { maxAge: 24 * 60 * 60 * 1000 },
	resave: false,
	saveUninitialized: true,
});

module.exports = sessionInstance;
