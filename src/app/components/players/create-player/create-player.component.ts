import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/player/player.service';
import { Player } from '../../../classes/player';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.scss']
})
export class CreatePlayerComponent implements OnInit {

  leagueId: number;
  teamId: number;
  player: Player;
  formGroup: FormGroup;
  creating = false;
  pending = false;
  invalidName = false;
  keyUpFirstName = new Subject<string>();
  keyUpLastName = new Subject<string>();


  constructor(private route: ActivatedRoute, private playerService: PlayerService,
    public snackBar: MatSnackBar, private router: Router, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      speed: ['', [Validators.required, Validators.min(2), Validators.max(96)]],
      strength: ['', [Validators.required, Validators.min(2), Validators.max(96)]],
      agility: ['', [Validators.required, Validators.min(2), Validators.max(96)]],
      salary: ['', [Validators.required, Validators.min(0)]],
      type: ['', [Validators.required]],
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
  }

  create() {
    if (this.pending || this.invalidName)
      return;
    this.creating = true;
    const player = this.formGroup.value as Player;
    this.playerService.postPlayer(this.leagueId, this.teamId, player).subscribe((teamId) => {
      this.snackBar.open('The player was created successfully!!', '', { duration: 5000 });
      this.router.navigateByUrl('/leagues/' + this.leagueId + '/teams/' + this.teamId);
    }, (error) => {
      if (error.status < 500 && error.status > 400)
        this.snackBar.open(error.error, '', { duration: 7500 });
      else
        this.snackBar.open('There was problem. Please try again.', '', { duration: 3000 });
    }, () => this.creating = false);
  }

  checkPlayerFullName() {
    const firstName = this.formGroup.value.firstName;
    const lastName = this.formGroup.value.lastName;
    if (!firstName || !lastName)
      return;
    this.pending = true;
    this.invalidName = false;
    return this.playerService.checkPlayerFullName(this.leagueId, this.teamId, firstName, lastName)
      .subscribe(() => { }, () => { this.invalidName = true; this.pending = false; }, () => this.pending = false);

  }

}
