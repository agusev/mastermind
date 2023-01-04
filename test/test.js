const assert = require('assert');
const Users = require('../controllers/users');
describe('Auth page', function () {
	describe('register', function () {
		const username = 'testUser';
		const password = '12345';

		beforeEach(async function () {
			return await Users.register({ username, password });
		});

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

	describe('login', function () {
		const username = 'testUser';
		const password = '12345';

		beforeEach(async function () {
			return await Users.register({ username, password });
		});

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
