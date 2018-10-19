import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from '../../../services/league/league.service';
import { TeamService } from '../../../services/team/team.service';
import { League } from '../../../classes/league';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {

  constructor(private route: ActivatedRoute, private leagueService: LeagueService,
    private teamService: TeamService, public snackBar: MatSnackBar) { }
  leagueId: number;
  league: League;
  loading = true;

  ngOnInit() {
    this.leagueId = this.route.snapshot.params.leagueId;
    this.leagueService.getLeague(this.leagueId).subscribe((data) => this.league = data as League, () => { },
      () => this.loading = false
    );
  }

  deleteTeam(i: number) {
    if (confirm('Are you sure to delete ' + this.league.teams[i].name + '?')) {
      this.teamService.deleteTeam(this.league.id, this.league.teams[i].id).subscribe(
        () => {
          this.league.teams.splice(i, 1);
          this.snackBar.open('The team was removed', '', { duration: 2000 });
        }, () => { });
    }

  }

}
