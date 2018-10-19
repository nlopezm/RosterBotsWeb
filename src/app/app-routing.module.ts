import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { LeaguesComponent } from './components/leagues/leagues.component';
import { LeagueComponent } from './components/leagues/league/league.component';
import { UpdateLeagueComponent } from './components/leagues/update-league/update-league.component';
import { CreateLeagueComponent } from './components/leagues/create-league/create-league.component';


import { TeamsComponent } from './components/teams/teams.component';
import { TeamComponent } from './components/teams/team/team.component';
import { UpdateTeamComponent } from './components/teams/update-team/update-team.component';
import { CreateTeamComponent } from './components/teams/create-team/create-team.component';

import { PlayersComponent } from './components/players/players.component';
import { PlayerComponent } from './components/players/player/player.component';
import { UpdatePlayerComponent } from './components/players/update-player/update-player.component';
import { CreatePlayerComponent } from './components/players/create-player/create-player.component';

const routes: Routes = [
  { path: 'leagues', component: LeaguesComponent, pathMatch: 'full' },
  { path: 'leagues/:leagueId', component: LeagueComponent, pathMatch: 'full' },
  { path: 'leagues/:leagueId/update', component: UpdateLeagueComponent, pathMatch: 'full' },
  { path: 'leagues/create', component: CreateLeagueComponent, pathMatch: 'full' },
  { path: 'leagues/:leagueId/teams', component: TeamsComponent, pathMatch: 'full' },
  { path: 'leagues/:leagueId/teams/:teamId', component: TeamComponent, pathMatch: 'full' },
  { path: 'leagues/:leagueId/teams/:teamId/update', component: UpdateTeamComponent, pathMatch: 'full' },
  { path: 'leagues/:leagueId/teams/create', component: CreateTeamComponent, pathMatch: 'full' },
  { path: 'leagues/:leagueId/teams/:teamId/players', component: PlayersComponent, pathMatch: 'full' },
  { path: 'leagues/:leagueId/teams/:teamId/players/:playerId', component: PlayerComponent, pathMatch: 'full' },
  { path: 'leagues/:leagueId/teams/:teamId/players/:playerId/update', component: UpdatePlayerComponent, pathMatch: 'full' },
  { path: 'leagues/:leagueId/teams/:teamId/players/create', component: CreatePlayerComponent, pathMatch: 'full' },
  { path: '**', redirectTo: 'leagues', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
