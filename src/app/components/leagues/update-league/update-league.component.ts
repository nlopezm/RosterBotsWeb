import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from '../../../services/league/league.service';
import { League } from '../../../classes/league';

@Component({
  selector: 'app-update-league',
  templateUrl: './update-league.component.html',
  styleUrls: ['./update-league.component.scss']
})
export class UpdateLeagueComponent implements OnInit {

  league: League;
  leagueId: number;

  constructor(private route: ActivatedRoute, private leagueService: LeagueService) { }

  ngOnInit() {
    this.leagueId = this.route.snapshot.params.leagueId;
    this.leagueService.getLeague(this.leagueId).subscribe((data) => this.league = data as League, () => { });
  }

}
