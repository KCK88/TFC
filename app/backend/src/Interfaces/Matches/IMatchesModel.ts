import { Matches } from '../../types/Matches';

export interface IMatchesModel {
  findAllMatches(): Promise<Matches[]>;
  findAllMatchesInProgres(inProgress: boolean):Promise<Matches[]>;
}
