import chai from 'chai';
import request from 'supertest';
import server from '../bin/server';

const expect = chai.expect;
const agent = request.agent(server);

describe('Homepage for fun', () => {
  it('Access home', done => {
    agent.get('/')
      .expect(200)
      .end(done);
  });
});