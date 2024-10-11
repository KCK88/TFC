import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { userToken, role, user } from './mocks/users.mock';
import Users from '../database/models/SequelizeUsers';
import Matches from '../database/models/SequelizeMatches';
import { allMatchs, matchesEnded, matchesOngoing } from './mocks/matches.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da tota de matches', () => {
  beforeEach(() => {
    sinon.restore();
  });
  it('should return all matches', async function() {
    sinon.stub(Matches, 'findAll').resolves(allMatchs as any);
    
    
    const { status, body } = await chai.request(app).get('/matches')

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMatchs)
  });

  it('should return all matches ongoing', async function() {
    sinon.stub(Matches, 'findAll').resolves(matchesOngoing as any);
    
    
    const { status, body } = await chai.request(app).get('/matches?inProgress=true')

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesOngoing)
  });

  it('should return all matches ended', async function() {
    sinon.stub(Matches, 'findAll').resolves(matchesEnded as any);
    
    
    const { status, body } = await chai.request(app).get('/matches?inProgress=false')

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesEnded)
  });
});