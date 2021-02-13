import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import Example from '../src/models/example';
import server from '../src/server';

chai.use(chaiHttp);
chai.should();
describe('Examples', () => {
	beforeEach((done) => {
		//Before each test we empty the database
		Example.remove({}, (err) => {
			Example.create(
				{
					example: 'first example',
				},
				(err) => {
					done();
				}
			);
		});
	});
	afterEach((done) => {
		Example.remove({}, (err) => {
			done();
		});
	});

	/*
	 * Test the /test route
	 */
	describe('/test request', () => {
		it('it should GET the test', (done) => {
			chai
				.request(server)
				.get('/test')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					res.body.should.be.eql({ message: 'Test success' });
					done();
				});
		});
		it('it should not GET the test', (done) => {
			chai
				.request(server)
				.get('/test')
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(500);
					done();
				});
		});
	});

	/*
	 * Test the /add-example route
	 */
	describe('/add-example request', () => {
		it('it should POST a add-example', (done) => {
			let example = {
				example: 'second example',
			};
			chai
				.request(server)
				.post('/add-example')
				.send(example)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(200);
					done();
				});
		});
		it('it should not POST a add-example', (done) => {
	    let example = {
				example: 'second example',
			};
			chai
				.request(server)
				.post('/add-example')
				.send(example)
				.end((err, res) => {
					if (err) done(err);
					res.should.have.status(500);
					done();
				});
		});
	});
});
