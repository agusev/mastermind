const assert = require('assert');
const Users = require('../controllers/users');

// tests auth page
describe('Auth page', function () {
	// tests user to be save in database
	describe('register', function () {
		const username = 'testUser';
		const password = '12345';

		// register a new user before each test
		beforeEach(async function () {
			return await Users.register({ username, password });
		});

		// delete the user before each test
		afterEach(async function () {
			let { id } = await Users.findUserByUsername({ username });
			await Users.deleteUserById({ id });
		});

		describe('User can be registered', function () {
			it('Should return id if user created', async function () {
				let { id } = await Users.findUserByUsername({ username });

				assert(id != undefined);
			});
		});
	});

	// tests user can sign in
	describe('login', function () {
		const username = 'testUser';
		const password = '12345';

		// register a new user before each test
		beforeEach(async function () {
			return await Users.register({ username, password });
		});

		// delete the user before each test
		afterEach(async function () {
			let { id } = await Users.findUserByUsername({ username });
			await Users.deleteUserById({ id });
		});

		describe('User exists', function () {
			it('Should return id if user exists', async function () {
				let { id } = await Users.findUserByUsername({ username });

				assert(id != undefined);
			});
		});
	});
});
