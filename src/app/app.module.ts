import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

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


// Services
import { LeagueService } from './services/league/league.service';
import { TeamService } from './services/team/team.service';
import { PlayerService } from './services/player/player.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LeaguesComponent,
    LeagueComponent,
    CreateLeagueComponent,
    UpdateLeagueComponent,
    TeamsComponent,
    TeamComponent,
    CreateTeamComponent,
    UpdateTeamComponent,
    PlayersComponent,
    PlayerComponent,
    CreatePlayerComponent,
    UpdatePlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    LeagueService,
    TeamService,
    PlayerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
