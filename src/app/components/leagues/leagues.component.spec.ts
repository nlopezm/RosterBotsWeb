import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LeaguesComponent } from './leagues.component';
import { MaterialModule } from '../../material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject } from '@angular/core';

describe('LeaguesComponent', () => {
  let component: LeaguesComponent;
  let fixture: ComponentFixture<LeaguesComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [],
      declarations: [LeaguesComponent],
      imports: [MaterialModule, RouterTestingModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be undefined at the beginning', function () {
    expect(component.leagues).toBeUndefined();
  });

  it('should load at the beginning', function () {
    expect(component.loading).toBeTruthy();
  });

});
