import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLeagueComponent } from './update-league.component';

describe('UpdateLeagueComponent', () => {
  let component: UpdateLeagueComponent;
  let fixture: ComponentFixture<UpdateLeagueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLeagueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
