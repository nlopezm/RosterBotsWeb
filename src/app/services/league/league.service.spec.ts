import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { LeagueService } from './league.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Team } from '../../classes/team';
import { Player } from '../../classes/player';
import { League } from 'src/app/classes/league';

describe('LeagueService', () => {
  let service: LeagueService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LeagueService],
    });
    service = TestBed.get(LeagueService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get a player successfully', () => {
    service.getLeague(1).subscribe((data: any) => {
      expect(data.name).toBe('Test league');
    });

    const req = httpMock.expectOne(environment.baseApiUrl + 'leagues/1', 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush({
      name: 'Test league'
    });

    httpMock.verify();
  });

  it('should post the correct data', () => {
    const league = new League();
    league.name = 'Test';
    league.starterPlayers = 10;
    league.salaryCap = 25;
    league.substitutePlayers = 20;

    service.postLeague(league).subscribe((data: any) => {
      expect(data.name).toBe('Test');
    });

    const req = httpMock.expectOne(
      environment.baseApiUrl + 'leagues',
      'post to api'
    );
    expect(req.request.method).toBe('POST');

    req.flush({
      name: 'Test',
    });

    httpMock.verify();
  });
  it('should put the correct data', () => {
    const league = new League();
    league.name = 'Test';
    league.starterPlayers = 10;
    league.salaryCap = 25;
    league.substitutePlayers = 20;
    league.id = 1;

    service.updateLeague(league).subscribe((data: any) => {
      expect(data.name).toBe('Test');
    });

    const req = httpMock.expectOne(
      environment.baseApiUrl + 'leagues/1',
      'put to api'
    );
    expect(req.request.method).toBe('PUT');

    req.flush({
      name: 'Test',
    });

    httpMock.verify();
  });

  it('should delete the correct data', () => {
    service.deleteLeague(1).subscribe((data: any) => {
      expect(data).toBeNull();
    });

    const req = httpMock.expectOne(
      environment.baseApiUrl + 'leagues/1',
      'delete to api'
    );
    expect(req.request.method).toBe('DELETE');

    req.flush(null);

    httpMock.verify();
  });

});
