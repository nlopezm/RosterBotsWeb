import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from '../../../services/league/league.service';
import { League } from '../../../classes/league';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar, MAT_AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-league',
  templateUrl: './update-league.component.html',
  styleUrls: ['./update-league.component.scss']
})
export class UpdateLeagueComponent implements OnInit {

  league: League;
  leagueId: number;
  formGroup: FormGroup;
  previousName: string;

  constructor(private route: ActivatedRoute, private leagueService: LeagueService,
    private fb: FormBuilder, private router: Router, public snackBar: MatSnackBar) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required], this.validateNameNotTaken.bind(this)],
      starterPlayers: ['', [Validators.required, Validators.max(25), Validators.min(1)]],
      substitutePlayers: ['', [Validators.required, Validators.max(25), Validators.min(1)]],
      salaryCap: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.leagueId = this.route.snapshot.params.leagueId;
    this.leagueService.getLeague(this.leagueId).subscribe(
      (data) => {
        this.league = data as League;
        this.previousName = this.league.name;
      },
      () => { });
  }

  create() {
    if (this.league.salaryCap < (this.league.starterPlayers + this.league.substitutePlayers))
      return;
    this.leagueService.updateLeague(this.league).subscribe(() => {
      this.snackBar.open('The league was updated!!', '', { duration: 5000 });
      this.router.navigateByUrl('/leagues');
    }, () => {
      this.snackBar.open('There was problem. Please try again.', '', { duration: 3000 });
    });
  }

  validateNameNotTaken(control: AbstractControl) {
    return this.leagueService.checkLeagueName(control.value).map(res => {
      return (res || this.previousName === this.league.name) ? null : { nameTaken: true };
    });
  }
}
