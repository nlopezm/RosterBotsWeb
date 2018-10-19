import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaguesComponent } from './components/leagues/leagues.component';
import { UpdateLeagueComponent } from './components/leagues/update-league/update-league.component';
import { LeagueComponent } from './components/league/league.component';

const routes: Routes = [
  { path: 'leagues', component: LeaguesComponent, pathMatch: 'full' },
  { path: 'leagues/:leagueId', component: LeagueComponent, pathMatch: 'full' },
  { path: 'leagues/:leagueId/update', component: UpdateLeagueComponent, pathMatch: 'full' },
  // { path: 'leagues/:leagueId/teams/:teamId', component: null, pathMatch: 'full' },
  // { path: 'leagues/:leagueId/teams/:teamId/players/:playerId', component: null, pathMatch: 'full' },
  { path: '**', redirectTo: 'leagues', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
