const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const Users = require('../controllers/users');
const { expect } = require('chai');

chai.use(chaiHttp);

// tests auth page
describe('Home page', function () {
	// verify that home page is rendered

	const username = 'testUser';
	const password = '12345';
	const rulesId = 'rules';

	// register a new user before each test
	beforeEach(async function () {
		return await Users.register({ username, password });
	});

	// delete the user before each test
	afterEach(async function () {
		let { id } = await Users.findUserByUsername({ username });
		await Users.deleteUserById({ id });
	});

	// describe('GET /', function () {
	// 	it('redirects to auth', (done) => {
	// 		chai.request(app)
	// 			.get('/')
	// 			.then(function (res) {
	// 				expect(res).to.redirect;
	// 				done();
	// 			});
	// });
	// });
});
