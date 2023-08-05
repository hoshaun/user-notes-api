require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.should();
chai.use(chaiHttp);

describe('User APIs', () => {
  const url = `http://localhost:${process.env.PORT}`;

  describe('Test POST /api/auth/signup', () => {
    it('returns a new user', (done) => {
      chai.request(url)
        .post(`/api/auth/signup`)
        .send({
          username: 'testuser',
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 409]);
          if (res.status === 200) {
            expect(res.body.username).to.equal('testuser');
          }
          done();
        });
    });
  });

  describe('Test POST /api/auth/login', () => {
    it('returns an access token', (done) => {
      chai.request(url)
        .post(`/api/auth/login`)
        .send({
          username: 'testuser',
          password: 'password'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).should.be.not.empty;
          done();
        });
    });
  });
});