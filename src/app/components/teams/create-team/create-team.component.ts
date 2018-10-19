import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../../services/team/team.service';
import { Team } from '../../../classes/team';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {

  leagueId: number;
  team: Team;
  formGroup: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router,
    private teamService: TeamService, public snackBar: MatSnackBar, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required], this.validateNameNotTaken.bind(this)],
    });
  }

  ngOnInit() {
    this.leagueId = this.route.snapshot.params.leagueId;
  }

  validateNameNotTaken(control: AbstractControl) {
    return this.teamService.checkTeamName(this.leagueId, control.value).map(res => {
      return res ? null : { nameTaken: true };
    });
  }


  create() {
    this.teamService.postTeam(this.leagueId, this.formGroup.value).subscribe((teamId) => {
      this.snackBar.open('The team was created and your players were generated!!', '', { duration: 5000 });
      this.router.navigateByUrl('/leagues/' + this.leagueId + '/teams/' + teamId);
    }, () => {
      this.snackBar.open('There was problem. Please try again.', '', { duration: 3000 });
    });
  }
}
