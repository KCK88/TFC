import { NewEntity } from '..';
import { Matches } from '../../types/Matches';

export interface IMatchesModel {
  findAllMatches(): Promise<Matches[]>;
  findAllMatchesInProgres(inProgress: boolean):Promise<Matches[]>;
  endMatch(id:number): Promise<Matches>;
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>;
  createMatch(match: NewEntity<Matches>): Promise<Matches>;
}
