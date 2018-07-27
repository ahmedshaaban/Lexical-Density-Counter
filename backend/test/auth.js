//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

require('dotenv').config()

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Auth', () => {
    describe('/POST login', () => {
        it('it should return jwt token for admin account', (done) => {
            chai.request(server)
                .post('/login')
                .send({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PW })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/POST login', () => {
        it('it should return unauthorized error', (done) => {
            chai.request(server)
                .post('/login')
                .send({ email: process.env.ADMIN_EMAIL, password: 'dumy' })
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });
});