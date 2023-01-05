const bcrypt = require('bcrypt');
const db = require('./index');

const LOOKUP_USER_BY_USERNAME =
	'SELECT id FROM users WHERE username=${username}';

const REGISTER_USER =
	'INSERT INTO users (username, password) VALUES (${username}, ${password}) RETURNING id, username';

const LOGIN_USER =
	'SELECT id, username, password FROM users WHERE username=${username}';

const DELETE_USER_BY_ID = 'DELETE FROM users WHERE id=${id}';

const register = ({ username, password }) => {
	return db
		.none(LOOKUP_USER_BY_USERNAME, { username })
		.then(() => bcrypt.hash(password, 10))
		.then((hash) => {
			db.one(REGISTER_USER, { username, password: hash });
		});
};

const findUserByUsername = async ({ username }) => {
	let query = await db.query(LOOKUP_USER_BY_USERNAME, { username });
	return query[0] ? query[0] : null;
};

const deleteUserById = ({ id }) => {
	return db.none(DELETE_USER_BY_ID, { id });
};

const login = ({ username, password }) => {
	return db
		.one(LOGIN_USER, { username })
		.then(({ id, username, password: encryptedPassword }) =>
			Promise.all([
				bcrypt.compare(password, encryptedPassword),
				{ id, username },
			])
		)
		.then(([result, { id, username }]) => {
			if (result) {
				return { id, username };
			} else {
				return Promise.reject(
					'Please enter a valid username and password.'
				);
			}
		});
};

module.exports = { register, login, findUserByUsername, deleteUserById };
