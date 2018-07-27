//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

require('dotenv').config()

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('COMPLEXITY', () => {

    describe('/POST complexity', () => {
        it('it should return the lexical density of the inputted text', (done) => {
            chai.request(server)
                .post('/complexity')
                .send({ text: 'i will do my homework to be the best one in this world' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.overall_ld.should.be.eql(0.5384615384615384);
                    done();
                });
        });
    });

    describe('/POST complexity', () => {
        it('it should return the lexical density of the inputted text in verbose mode', (done) => {
            chai.request(server)
                .post('/complexity?mode=verbose')
                .send({ text: 'i will do my homework to be the best one in this world. i will do my homework to be the best one in this world. i will do my homework to be the best one in this world.' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.overall_ld.should.be.eql(0.5384615384615384);
                    res.body.data.sentence_ld.should.be.eql([0.9259259259259259, 0.9259259259259259, 0.9259259259259259]);
                    done();
                });
        });
    });

    describe('/POST complexity', () => {
        it('it should return error beacuse Only texts with up to 100 words or up to 1000 characters are valid input.', (done) => {
            let sentance = "i love you ";
            for (let i = 0; i < 10; i++)
                sentance += sentance

            chai.request(server)
                .post('/complexity')
                .send({ text: sentance })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.error.should.be.eql('Only texts with up to 100 words or up to 1000 characters are valid input.');
                    done();
                });
        });
    });

    describe('/POST complexity', () => {
        it('it should add new non lexical word to db after successful login', (done) => {
            chai.request(server)
                .post('/login')
                .send({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PW })
                .end((err, res) => {
                    res.should.have.status(200);
                    const jwtToken = res.text
                    chai.request(server)
                        .post('/complexity/add')
                        .set('Authorization', 'Bearer ' + jwtToken)
                        .send({ word: 'dumy' })
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        })
                });
        });
    });

    describe('/POST complexity', () => {
        it('it should add new non lexical word to db after successful login', (done) => {
            chai.request(server)
                .post('/complexity/add')
                .send({ word: 'dumy' })
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                })
        });
    });
    
});