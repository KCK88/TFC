import { TeamMatches } from '../../types/TeamMatches';
import { Teams } from '../../types/Teams';

export interface ITeamsModel {
  findAll(): Promise<Teams[]>,
  findById(id: Teams['id']): Promise<Teams | null>
  homeLeaderboard(): Promise<Map<number, TeamMatches[]>>
}
