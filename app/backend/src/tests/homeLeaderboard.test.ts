import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


import Teams from '../database/models/SequelizeTeams';
import { homeLeaderboard } from './mocks/leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota leaderbords', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('should return all home leaderboard', async function() {
    sinon.stub(Teams, 'findAll').returns(homeLeaderboard as any);

    const { status, body } = await chai.request(app).get('/leaderboard/home');
console.log(status, body);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(homeLeaderboard);
  });
});
