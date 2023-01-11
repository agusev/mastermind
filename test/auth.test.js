const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Users = require('../controllers/users');
const { expect } = require('chai');

chai.use(chaiHttp);

// tests auth page
describe('Auth page', function () {
	// verify that auth page is rendered

	const loginId = 'auth-login-form';
	const registerId = 'auth-register-form';

	describe('GET /auth', function (req, res) {
		it('returns 200', (done) => {
			chai.request(app)
				.get('/auth')
				.end(function (err, res) {
					expect(res).to.have.status(200);
					done();
				});
		});

		it('login form rendered', (done) => {
			chai.request(app)
				.get('/auth')
				.end(function (err, res) {
					expect(res.text.includes(loginId));
					done();
				});
		});

		it('register form rendered', (done) => {
			chai.request(app)
				.get('/auth')
				.end(function (err, res) {
					expect(res.text.includes(registerId));
					done();
				});
		});
	});

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
			const { id } = await Users.findUserByUsername({ username });
			await Users.deleteUserById({ id });
		});

		describe('POST /auth/register', function () {
			it('should return user id', async function () {
				const { id } = await Users.findUserByUsername({ username });
				console.debug(id);
				expect(id).to.not.be.undefined;
				expect(id).to.not.be.null;
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
			const { id } = await Users.findUserByUsername({ username });
			await Users.deleteUserById({ id });
		});

		describe('POST /auth/login', function () {
			it('should return id if user exists', async function () {
				const { id } = await Users.findUserByUsername({ username });
				console.debug(id);
				expect(id).to.not.be.undefined;
				expect(id).to.not.be.null;
			});
		});
	});
});
