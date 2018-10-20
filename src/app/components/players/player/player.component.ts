import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/player/player.service';
import { Player } from '../../../classes/player';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

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
  updatingPlayer = false;
  pending = false;
  invalidName = false;
  keyUpFirstName = new Subject<string>();
  keyUpLastName = new Subject<string>();

  constructor(private route: ActivatedRoute, private playerService: PlayerService,
    public snackBar: MatSnackBar, private router: Router, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });

    const subscriptionFirstName = this.keyUpFirstName
      .map(event => event.target.value)
      .debounceTime(1000)
      .distinctUntilChanged()
      .flatMap(search => Observable.of(search).delay(500))
      .subscribe(() => this.checkPlayerFullName());

    const subscriptionLastName = this.keyUpLastName
      .map(event => event.target.value)
      .debounceTime(1000)
      .distinctUntilChanged()
      .flatMap(search => Observable.of(search).delay(500))
      .subscribe(() => this.checkPlayerFullName());
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

  update() {
    if (this.pending || this.invalidName)
      return;
    this.updatingPlayer = true;
    const player = this.formGroup.value as Player;
    player.id = this.playerId;
    this.playerService.updatePlayer(this.leagueId, this.teamId, player).subscribe((teamId) => {
      this.snackBar.open('The player was updated successfully!!', '', { duration: 5000 });
      this.router.navigateByUrl('/leagues/' + this.leagueId + '/teams/' + this.teamId);
    }, () => {
      this.snackBar.open('There was problem. Please try again.', '', { duration: 3000 });
    }, () => this.updatingPlayer = false);
  }

  checkPlayerFullName() {
    const firstName = this.formGroup.value.firstName;
    const lastName = this.formGroup.value.lastName;
    if (this.previousName === firstName + ' ' + lastName) {
      this.invalidName = false;
      return;
    }
    if (!firstName || !lastName)
      return;
    this.pending = true;
    this.invalidName = false;
    return this.playerService.checkPlayerFullName(this.leagueId, this.teamId, firstName, lastName)
      .subscribe(() => { }, () => { this.invalidName = true; this.pending = false; }, () => this.pending = false);

  }


}
