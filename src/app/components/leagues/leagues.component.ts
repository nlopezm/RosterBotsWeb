import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../../services/league/league.service';
import { League } from '../../classes/league';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss']
})
export class LeaguesComponent implements OnInit {
  loading = true;
  leagues: League[];
  constructor(private leagueService: LeagueService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.leagueService.getLeagues().subscribe((data) => this.leagues = data as League[],
      () => {}, () => this.loading = false);
  }

  deleteLeague(i: number) {
    if (confirm('Are you sure to delete ' + this.leagues[i].name + '?')) {
      this.leagueService.deleteLeague(this.leagues[i].id).subscribe(
        () => {
          this.leagues.splice(i, 1);
          this.snackBar.open('The league was removed', '', { duration: 2000 });
        }, () => { });
    }

  }

  createLeague() {

  }



}
