import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { LeaguesComponent } from './components/leagues/leagues.component';
import { LeagueComponent } from './components/leagues/league/league.component';
import { UpdateLeagueComponent } from './components/leagues/update-league/update-league.component';
import { CreateLeagueComponent } from './components/leagues/create-league/create-league.component';

import { TeamComponent } from './components/teams/team/team.component';
import { UpdateTeamComponent } from './components/teams/update-team/update-team.component';
import { CreateTeamComponent } from './components/teams/create-team/create-team.component';

import { PlayerComponent } from './components/players/player/player.component';

const routes: Routes = [
  { path: 'leagues', component: LeaguesComponent, pathMatch: 'full', data: { title: 'Leagues' } },
  { path: 'leagues/create', component: CreateLeagueComponent, pathMatch: 'full', data: { title: 'Create league' } },
  { path: 'leagues/:leagueId', component: LeagueComponent, pathMatch: 'full', data: { title: 'Leagues' } },
  { path: 'leagues/:leagueId/update', component: UpdateLeagueComponent, pathMatch: 'full', data: { title: 'Update league' } },
  { path: 'leagues/:leagueId/teams/create', component: CreateTeamComponent, pathMatch: 'full', data: { title: 'Create team' } },
  { path: 'leagues/:leagueId/teams/:teamId', component: TeamComponent, pathMatch: 'full', data: { title: 'Teams' } },
  { path: 'leagues/:leagueId/teams/:teamId/update', component: UpdateTeamComponent, pathMatch: 'full', data: { title: 'Update team' } },
  { path: 'leagues/:leagueId/teams/:teamId/players/:playerId', component: PlayerComponent, pathMatch: 'full', data: { title: 'Update player' } },
  { path: '**', redirectTo: 'leagues', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
