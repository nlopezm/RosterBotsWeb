import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/player/player.service';
import { Player } from '../../../classes/player';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


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

  constructor(private route: ActivatedRoute, private playerService: PlayerService,
    public snackBar: MatSnackBar, private router: Router, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required], this.validateFirstName.bind(this)],
      lastName: ['', [Validators.required], this.validateLastName.bind(this)],
      speed: ['', [Validators.required, Validators.min(2), Validators.max(96)]],
      strength: ['', [Validators.required, Validators.min(2), Validators.max(96)]],
      agility: ['', [Validators.required, Validators.min(2), Validators.max(96)]],
      salary: ['', [Validators.required, Validators.min(0)]],
      type: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.leagueId = this.route.snapshot.params.leagueId;
    this.teamId = this.route.snapshot.params.teamId;
  }

  validateFirstName(control: AbstractControl) {
    return this.validateNameNotTaken(control.value, this.formGroup.value.lastName);
  }
  validateLastName(control: AbstractControl) {
    return this.validateNameNotTaken(this.formGroup.value.firstName, control.value);
  }

  validateNameNotTaken(firstName: string, lastName: string) {
    return this.playerService.checkPlayerFullName(this.leagueId, this.teamId, firstName, lastName).map(res => {
      return res ? null : { nameTaken: true };
    });
  }


  create() {
    const player = this.formGroup.value as Player;
    this.playerService.postPlayer(this.leagueId, this.teamId, player).subscribe((teamId) => {
      this.snackBar.open('The player was created successfully!!', '', { duration: 5000 });
      this.router.navigateByUrl('/leagues/' + this.leagueId + '/teams/' + this.teamId);
    }, (error) => {
      if (error.status < 500 && error.status > 400)
        this.snackBar.open(error.error, '', { duration: 7500 });
      else
        this.snackBar.open('There was problem. Please try again.', '', { duration: 3000 });

    });
  }

}
