import chai from 'chai';
import request from 'supertest';
import server from '../bin/server';
import faker from 'faker';

const expect = chai.expect;
const agent = request.agent(server);

describe('Login API', () => {
  let email = faker.random.alphaNumeric(20),
    password = faker.random.alphaNumeric(10);
  before(done => {
    agent.post('/api/auth/register')
      .type('form')
      .send({ email: email, password: password, firstName: faker.random.word(), lastName: faker.random.word() })
      .expect(201)
      .end(done);
  });

  it('Login done!!!', done => {
    agent.post('/api/auth/login')
      .type('form')
      .send({ email: email, password: password })
      .end((err, data) => {
        expect(200);
        expect(err).to.not.exist;
        expect(data.body.user.email).to.equal(email);
        done();
      });
  });

  it('Login wrong email', done => {
    agent.post('/api/auth/login')
      .type('form')
      .send({ email: 'email', password: password })
      .expect(401)
      .end(done);
  });

  it('Login wrong password', done => {
    agent.post('/api/auth/login')
      .type('form')
      .send({ email: email, password: 'password' })
      .expect(401)
      .end(done);
  });

  it('Login: Lack of input data - email', done => {
    agent.post('/api/auth/login')
      .type('form')
      .send({ email: '', password: password })
      .expect(400)
      .end(done);
  });

  it('Login: Lack of input data - password', done => {
    agent.post('/api/auth/login')
      .type('form')
      .send({ email: email, password: '' })
      .expect(400)
      .end(done);
  });
});