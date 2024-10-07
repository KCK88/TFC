import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import { ITeams } from '../Interfaces/Teams/ITeams';

export default class TeamsModel implements ITeamsModel {
  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { teamName }: ITeams = dbData;
    return { id, teamName };
  }

  private model = SequelizeTeams;
}
