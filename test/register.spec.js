import chai from 'chai';
import request from 'supertest';
import server from '../bin/server';
import faker from 'faker';

const expect = chai.expect;
const agent = request.agent(server);

describe('Request Id', () => {
  it('Should save a User to the database', (done) => {
    agent.post('/api/auth/register')
      .type('form')
      .send({ email: faker.random.alphaNumeric(20), password: faker.random.alphaNumeric(10), firstName: faker.random.word(), lastName: faker.random.word() })
      .expect(201)
      .end(done);
  });

  it('Lack of input data: email', (done) => {
    agent.post('/api/auth/register')
      .type('form')
      .send({ email: '', password: faker.random.alphaNumeric(10), firstName: faker.random.word(), lastName: faker.random.word() })
      .expect(422)
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body.error).to.equal('You must enter an email address.');
        done();
      });
  });

  it('Lack of input data: password', (done) => {
    agent.post('/api/auth/register')
      .type('form')
      .send({ email: faker.random.alphaNumeric(20), password: '', firstName: faker.random.word(), lastName: faker.random.word() })
      .expect(422)
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body.error).to.equal('You must enter a password.');
        done();
      });
  });

  it('Email Used', (done) => {
    let email = faker.random.alphaNumeric(20),
      password = faker.random.alphaNumeric(10),
      firstName = faker.random.word(),
      lastName = faker.random.word();
    agent.post('/api/auth/register')
      .type('form')
      .send({ email: email, password: password, firstName: firstName, lastName: lastName })
      .expect(201)
      .end(() => {
        agent.post('/api/auth/register')
          .type('form')
          .send({ email: email, password: password, firstName: firstName, lastName: lastName })
          .expect(422)
          .end((err, res) => {
            expect(err).to.not.exist;
            expect(res.body.error).to.equal('That email address is already in use.');
            done();
          });
      });
  });
});