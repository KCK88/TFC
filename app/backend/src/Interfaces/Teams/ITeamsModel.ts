import { Teams } from '../../types/Teams';

export interface ITeamsModel {
  // create(data: Partial<Teams>): Promise<Teams>,
  findAll(): Promise<Teams[]>,
  findById(id: Teams['id']): Promise<Teams | null>
}
