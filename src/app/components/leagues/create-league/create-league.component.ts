import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../../../services/league/league.service';
import { League } from '../../../classes/league';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.scss']
})
export class CreateLeagueComponent implements OnInit {

  league: League;
  formGroup: FormGroup;

  constructor(private leagueService: LeagueService, private fb: FormBuilder,
    private router: Router, public snackBar: MatSnackBar) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required], this.validateNameNotTaken.bind(this)],
      starterPlayers: ['', [Validators.required, Validators.max(25), Validators.min(1)]],
      substitutePlayers: ['', [Validators.required, Validators.max(25), Validators.min(1)]],
      salaryCap: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
  }

  create() {
    if (this.formGroup.value.salary < (this.formGroup.value.starterPlayers + this.formGroup.value.substitutePlayers))
      return;
    this.leagueService.postLeague(this.formGroup.value).subscribe(() => {
      this.snackBar.open('The league was created!!', '', { duration: 5000 });
      this.router.navigateByUrl('/leagues');
    }, () => {
      this.snackBar.open('There was problem. Please try again.', '', { duration: 3000 });
    });
  }

  validateNameNotTaken(control: AbstractControl) {
    return this.leagueService.checkLeagueName(control.value).map(res => {
      return res ? null : { nameTaken: true };
    });

  }

}
