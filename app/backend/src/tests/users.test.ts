import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { userToken, role, user } from './mocks/users.mock';
import Users from '../database/models/SequelizeUsers';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da tota de users', () => {
  beforeEach(() => {
    sinon.restore();
  });
  it('should return JWT', async function() {
    sinon.stub(Users, 'findOne').resolves(user as any);
    
    
    const { status, body } = await chai.request(app).post('/login').send({"email": "admin@admin.com", "password": 'secret_admin'});

    expect(status).to.equal(200);
    expect(body.token.split('.').length).to.equal(3);
  });

  it('should return a team by id', async function() {
    sinon.stub(Users, 'findOne').resolves(role as any);

    const { status, body } = await chai.request(app).get('/login/role').set({Authorization: `Bearer ${userToken.token}`})

    expect(status).to.equal(200);
    expect(body).to.deep.equal(role);
  });
});
