// import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { Matches } from '../types/Matches';
import MatchesModel from '../models/MatchesModel';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) { }

  public async getAllMatches(): Promise<Matches[]> {
    const allMatches = await this.matchesModel.findAllMatches();
    return allMatches;
  }

  public async findAllMatchesInProgres(inProgress: string) {
    const inProgressToBool = inProgress === 'true';
    const matchesInProgres = await this.matchesModel.findAllMatchesInProgres(inProgressToBool);
    return matchesInProgres;
  }
}
