import { Player } from './player';
import { League } from './league';

export class Team {
  id: number;
  name: string;
  players: Player[];
  league: League;
}
