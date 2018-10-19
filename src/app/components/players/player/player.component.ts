import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/player/player.service';
import { Player } from '../../../classes/player';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  leagueId: number;
  teamId: number;
  playerId: number;
  player: Player;
  updating = false;

  constructor(private route: ActivatedRoute, private playerService: PlayerService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.leagueId = this.route.snapshot.params.leagueId;
    this.teamId = this.route.snapshot.params.teamId;
    this.playerId = this.route.snapshot.params.playerId;
    this.playerService.getPlayer(this.leagueId, this.teamId, this.playerId)
      .subscribe((data) => this.player = data as Player, () => { });
  }

  updatePlayer() {
    this.updating = true;
  }

  confirm() {
    this.updating = false;
  }


}
