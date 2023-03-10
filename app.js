const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const protect = require('./config/protect');
const sessionInstance = require('./config/session');

if (process.env.NODE_ENV === 'development') {
	require('dotenv').config();
}

const indexRouter = require('./routes/index');
const gameRouter = require('./routes/game');
const authRouter = require('./routes/auth');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessionInstance);

// define Routes
//public routes
app.use('/auth', authRouter);

// protected routes
app.use('/', protect, indexRouter);
app.use('/game', protect, gameRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('public/error');
});

module.exports = app;
