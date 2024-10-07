import TeamsModel from '../models/TeamsModel';
import { ITeams } from '../Interfaces/Teams/ITeams';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) { }

  public async getAllTemas(): Promise<ITeams[]> {
    const allTeams = await this.teamsModel.findAll();
    return allTeams;
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeams>> {
    const team = await this.teamsModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
