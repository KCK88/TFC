import TeamsModel from '../models/TeamsModel';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { Teams } from '../types/Teams';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) { }

  public async getAllTeams(): Promise<Teams[]> {
    const allTeams = await this.teamsModel.findAll();
    return allTeams;
  }

  public async getTeamById(id: number): Promise<ServiceResponse<Teams>> {
    const team = await this.teamsModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
