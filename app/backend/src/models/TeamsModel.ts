import { Teams } from '../types/Teams';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';

export default class TeamsModel implements ITeamsModel {
  async findAll(): Promise<Teams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: Teams['id']): Promise<Teams | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { teamName }: Teams = dbData;
    return { id, teamName };
  }

  private model = SequelizeTeams;
}
