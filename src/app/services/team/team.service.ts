import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/Rx';
import { Team } from '../../classes/team';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  url = environment.baseApiUrl + 'leagues/';
  constructor(public http: HttpClient) { }

  getTeams(leagueId: number): Observable<{}> {
    return this.http.get(this.url + leagueId + '/teams');
  }

  getTeam(leagueId: number, teamId: number): Observable<{}> {
    return this.http.get(this.url + leagueId + '/teams/' + teamId);
  }

  postTeam(leagueId: number, team: Team): Observable<{}> {
    return this.http.post<Team>(this.url + leagueId + '/teams', team);
  }

  updateTeam(leagueId: number, team: Team): Observable<{}> {
    return this.http.put<Team>(this.url + leagueId + '/teams/' + team.id, team);
  }

  deleteTeam(leagueId: number, teamId: number): Observable<{}> {
    return this.http.delete(this.url + leagueId + '/teams/' + teamId);
  }

  checkTeamName(leagueId: number, name: string): Observable<{}> {
    return this.http.head(this.url + leagueId + '/teams?name=' + name).pipe(
      map(res => of(true)),
      catchError(err => of(false)));
  }
}
