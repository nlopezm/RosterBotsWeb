import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/player/player.service';
import { Player } from '../../../classes/player';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  leagueId: number;
  teamId: number;
  playerId: number;
  player;
  updating = false;
  formGroup: FormGroup;
  previousName: string;

  constructor(private route: ActivatedRoute, private playerService: PlayerService,
    public snackBar: MatSnackBar, private router: Router, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required], this.validateFirstName.bind(this)],
      lastName: ['', [Validators.required], this.validateLastName.bind(this)],
    });
  }

  ngOnInit() {
    this.leagueId = this.route.snapshot.params.leagueId;
    this.teamId = this.route.snapshot.params.teamId;
    this.playerId = this.route.snapshot.params.playerId;
    this.playerService.getPlayer(this.leagueId, this.teamId, this.playerId)
      .subscribe((data) => {
        this.player = data;
        this.previousName = this.player.first_name + ' ' + this.player.last_name;
      }
        , () => { });
  }

  updatePlayer() {
    this.updating = true;
  }

  validateFirstName(control: AbstractControl) {
    return this.validateNameNotTaken(control.value, this.player.last_name);
  }
  validateLastName(control: AbstractControl) {
    return this.validateNameNotTaken(this.player.first_name, control.value);
  }

  validateNameNotTaken(firstName: string, lastName: string) {
    return this.playerService.checkPlayerFullName(this.leagueId, this.teamId, firstName, lastName).map(res => {
      return (res || this.previousName === (this.player.first_name + ' ' + this.player.last_name)) ? null : { nameTaken: true };
    });
  }


  update() {
    const player = this.formGroup.value as Player;
    player.id = this.playerId;
    this.playerService.updatePlayer(this.leagueId, this.teamId, player).subscribe((teamId) => {
      this.snackBar.open('The player was updated successfully!!', '', { duration: 5000 });
      this.router.navigateByUrl('/leagues/' + this.leagueId + '/teams/' + this.teamId);
    }, () => {
      this.snackBar.open('There was problem. Please try again.', '', { duration: 3000 });
    });
  }


}
