import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


import Teams from '../database/models/SequelizeTeams';
import { teamsMatches, teamsMatchesResult } from './mocks/leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota leaderbords', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('should return all home leaderboard', async function() {
    sinon.stub(Teams, 'findAll').resolves(JSON.parse(JSON.stringify(teamsMatches)));

    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.equal(200);
  });
});
