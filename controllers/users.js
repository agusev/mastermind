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
		})
		.catch((err) => console.log({ err }));
};

const findUserByUsername = async ({ username }) => {
	let query = await db
		.query(LOOKUP_USER_BY_USERNAME, { username })
		.catch((err) => console.log({ err }));

	return query.length > 0 ? query[0] : null;
};

const deleteUserById = ({ id }) => {
	return db
		.none(DELETE_USER_BY_ID, { id })
		.catch((err) => console.log({ err }));
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
				return null;
			}
		})
		.catch((err) => console.log({ err }));
};

module.exports = { register, login, findUserByUsername, deleteUserById };
