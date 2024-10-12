import { Matches } from './Matches';

export type Teams = {
  id: number;
  teamName: string
  matches?: Matches[]
};
