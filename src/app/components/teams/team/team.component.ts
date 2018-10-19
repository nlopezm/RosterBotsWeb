import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../../services/team/team.service';
import { PlayerService } from '../../../services/player/player.service';
import { MatSnackBar } from '@angular/material';
import { Team } from '../../../classes/team';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  leagueId: number;
  teamId: number;
  team: Team;

  constructor(private route: ActivatedRoute, public snackBar: MatSnackBar,
    private playerService: PlayerService, private teamService: TeamService) { }

  ngOnInit() {
    this.leagueId = this.route.snapshot.params.leagueId;
    this.teamId = this.route.snapshot.params.teamId;
    this.teamService.getTeam(this.leagueId, this.teamId).subscribe((data) => this.team = data as Team, () => { });
  }

}
