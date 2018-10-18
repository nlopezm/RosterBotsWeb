import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

// Components
import { LeagueComponent } from './components/league/league.component';

// Services
import { LeagueService } from './services/league/league.service';
import { TeamService } from './services/team/team.service';
import { PlayerService } from './services/player/player.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LeagueComponent,
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
