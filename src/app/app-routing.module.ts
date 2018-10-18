import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeagueComponent } from './league/league.component';

const routes: Routes = [
  // { path: 'leagues', component: null, pathMatch: 'full' },
  { path: 'leagues/:leagueId', component: LeagueComponent, pathMatch: 'full' },
  // { path: 'leagues/:leagueId/teams/:teamId', component: null, pathMatch: 'full' },
  // { path: 'leagues/:leagueId/teams/:teamId/players/:playerId', component: null, pathMatch: 'full' },
  { path: '**', redirectTo: 'leagues', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
