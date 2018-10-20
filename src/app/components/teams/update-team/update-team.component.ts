import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../../services/team/team.service';
import { Team } from '../../../classes/team';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.scss']
})
export class UpdateTeamComponent implements OnInit {

  team: Team;
  leagueId: number;
  teamId: number;
  formGroup: FormGroup;
  previousName: string;
  updating = false;

  constructor(private route: ActivatedRoute, private teamService: TeamService,
    private fb: FormBuilder, private router: Router, public snackBar: MatSnackBar) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required], this.validateNameNotTaken.bind(this)],
    });
  }

  ngOnInit() {
    this.leagueId = this.route.snapshot.params.leagueId;
    this.teamId = this.route.snapshot.params.teamId;
    this.teamService.getTeam(this.leagueId, this.teamId).subscribe(
      (data) => {
        this.team = data as Team;
        this.previousName = this.team.name;
      },
      () => { });
  }

  update() {
    this.updating = true;
    this.teamService.updateTeam(this.leagueId, this.team).subscribe(() => {
      this.snackBar.open('The team was updated!!', '', { duration: 5000 });
      this.router.navigateByUrl('/leagues/' + this.leagueId);
    }, () => {
      this.snackBar.open('There was problem. Please try again.', '', { duration: 3000 });
    }, ()=>this.updating=false);
  }

  validateNameNotTaken(control: AbstractControl) {
    return this.teamService.checkTeamName(this.leagueId, control.value).map(res => {
      return (res || this.previousName === this.team.name) ? null : { nameTaken: true };
    });
  }

}
