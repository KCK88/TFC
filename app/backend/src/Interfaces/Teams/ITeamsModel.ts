import { TeamMatches } from '../../types/TeamMatches';
import { Teams } from '../../types/Teams';

export interface ITeamsModel {
  findAll(): Promise<Teams[]>,
  findById(id: Teams['id']): Promise<Teams | null>
  homeLeaderboard(teamType: string): Promise<Map<number, TeamMatches[]>>
}
