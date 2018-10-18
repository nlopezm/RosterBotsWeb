import { Team } from './team';
export class Player {
  id: number;
  unique_id: string;
  firstName: string;
  lastName: string;
  speed: number;
  strength: number;
  agility: number;
  salary: number;
  team: Team;
}
