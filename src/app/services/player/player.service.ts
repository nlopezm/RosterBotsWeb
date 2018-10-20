import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/Rx';
import { Player } from '../../classes/player';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  url = environment.baseApiUrl + 'leagues/';
  constructor(public http: HttpClient) { }

  getPlayers(leagueId: number, teamId: number): Observable<{}> {
    return this.http.get(this.url + leagueId + '/teams/' + teamId + '/players');
  }

  getPlayer(leagueId: number, teamId: number, playerId: number): Observable<{}> {
    return this.http.get(this.url + leagueId + '/teams/' + teamId + '/players/' + playerId);
  }

  postPlayer(leagueId: number, teamId: number, player: Player): Observable<{}> {
    return this.http.post(this.url + leagueId + '/teams/' + teamId + '/players/' + player.type, player);
  }

  updatePlayer(leagueId: number, teamId: number, player: Player): Observable<{}> {
    const fullName = {
      firstName: player.firstName,
      lastName: player.lastName
    };
    return this.http.put(this.url + leagueId + '/teams/' + teamId + '/players/' + player.id, fullName);
  }

  deletePlayer(leagueId: number, teamId: number, playerId: number): Observable<{}> {
    return this.http.delete(this.url + leagueId + '/teams/' + teamId + '/players/' + playerId);
  }

  checkPlayerFullName(leagueId: number, teamId: number, firstName: string, lastName: string): Observable<{}> {
    return this.http.head(this.url + leagueId + '/teams/' + teamId + '/players?firstName=' + firstName + '&lastName=' + lastName).pipe(
      map(res => of(true)),
      catchError(err => of(false)));
  }

}
