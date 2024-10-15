import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import jwtUtils from '../utils/jwt.util';

import { app } from '../app';

import { Response } from 'superagent';
import { userToken, role, user } from './mocks/users.mock';
import Users from '../database/models/SequelizeUsers';
import Matches from '../database/models/SequelizeMatches';
import { allMatchs, createBody, createdMatch, equalTeams, matchesEnded, matchesOngoing, notFoundTeam } from './mocks/matches.mocks';
import { set } from '../database/config/database';
import MatchesController from '../controllers/MatchesController';

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

  it('should return created match', async function() {
    sinon.stub(Matches, 'create').resolves(createdMatch as any);
    sinon.stub(jwtUtils, 'verifyToken').resolves(true as any);
    
    const { status, body } = await chai.request(app).post('/matches').set({authorization: 'Xablau!!!'}).send(createBody)


    expect(status).to.equal(201);
    expect(body).to.deep.equal(createdMatch)
  });


  it('should return status 401 when fails to create a match', async function() {
    // sinon.stub(Matches, 'create').resolves(createdMatch as any); não precisa, não vai entrar no stub
    // sinon.stub(jwtUtils, 'verifyToken').resolves(false as any); não precisa, não vai entrar no stub
    
    const { status, body } = await chai.request(app).post('/matches').set({authorization: ''}).send(createBody)


    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token not found' })
  });

  it('should return status 401 when fails to create a match', async function() {
    // sinon.stub(Matches, 'create').resolves(createdMatch as any); não precisa, não vai entrar no stub
    // sinon.stub(jwtUtils, 'verifyToken').returns(false as any); // Precisa se não para no if
    sinon.stub(jwtUtils, 'verifyToken').throws(); // O throws serve por que tem um trycatch e o expect vai ter um erro
    
    const { status, body } = await chai.request(app).post('/matches').set({authorization: 'Xablau!!'}).send(createBody)


    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token' })
  });

  it('should return status 422 when fails to create a match', async function() {
    sinon.stub(Matches, 'create').resolves(createdMatch as any);
    sinon.stub(jwtUtils, 'verifyToken').resolves(true as any);
    
    const { status, body } = await chai.request(app).post('/matches').set({authorization: 'Xablau!!!'}).send(equalTeams)


    expect(status).to.equal(422);
    expect(body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' })
  });

  it('should return status 404 when fails to create a match', async function() {
    sinon.stub(Matches, 'create').throws()
    sinon.stub(jwtUtils, 'verifyToken').returns(true as any);    

    const { status, body } = await chai.request(app).post('/matches').set({authorization: 'Xablau!!!'}).send(notFoundTeam)


    expect(status).to.equal(404);
    expect(body).to.deep.equal({message: 'There is no team with such id!'})
  });
});