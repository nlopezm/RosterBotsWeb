import { Team } from './team';

export class League {
  id: number;
  name: string;
  starterPlayers: number;
  substitutePlayers: number;
  salaryCap: number;
  teams: Team[];
}
