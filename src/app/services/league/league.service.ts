import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { League } from '../../classes/league';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  url = environment.baseApiUrl + 'leagues';
  constructor(public http: HttpClient) { }

  getLeagues(): Observable<{}> {
    return this.http.get(this.url);
  }

  getLeague(leagueId: number): Observable<{}> {
    return this.http.get(this.url + '/' + leagueId);
  }

  postLeague(league: League): Observable<{}> {
    return this.http.post<League>(this.url, league);
  }

  updateLeague(league: League): Observable<{}> {
    return this.http.put<League>(this.url + '/' + league.id, league);
  }

  deleteLeague(leagueId: number): Observable<{}> {
    return this.http.delete(this.url + '/' + leagueId);
  }

  checkLeagueName(name: string): Observable<{}> {
    return this.http.head(this.url + '/?name=' + name);
  }
}
