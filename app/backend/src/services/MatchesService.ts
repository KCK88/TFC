// import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { Matches } from '../types/Matches';
import MatchesModel from '../models/MatchesModel';
import { NewEntity } from '../Interfaces';
import TeamsModel from '../models/TeamsModel';

export default class MatchesService {
  constructor(
    private matchesModel = new MatchesModel(),
    private teamsModel = new TeamsModel(),
  ) { }

  async createMatch(match: NewEntity<Matches>): Promise<Matches> {
    const matchCreate = await this.matchesModel.createMatch(match);
    const newMatch = {
      id: matchCreate.id,
      homeTeamId: matchCreate.homeTeamId,
      homeTeamGoals: matchCreate.homeTeamGoals,
      awayTeamId: matchCreate.awayTeamId,
      awayTeamGoals: matchCreate.awayTeamGoals,
      inProgress: matchCreate.inProgress,
    };
    return newMatch;
  }

  public async getAllMatches(): Promise<Matches[]> {
    const allMatches = await this.matchesModel.findAllMatches();
    return allMatches;
  }

  public async findAllMatchesInProgres(inProgress: string) {
    const inProgressToBool = inProgress === 'true';
    const matchesInProgres = await this.matchesModel.findAllMatchesInProgres(inProgressToBool);
    return matchesInProgres;
  }

  public async endMatch(id: number) {
    const update = await this.matchesModel.endMatch(id);
    return update;
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void> {
    await this.matchesModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
  }
}
