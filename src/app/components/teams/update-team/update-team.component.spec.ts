import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTeamComponent } from './update-team.component';

describe('UpdateTeamComponent', () => {
  let component: UpdateTeamComponent;
  let fixture: ComponentFixture<UpdateTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
