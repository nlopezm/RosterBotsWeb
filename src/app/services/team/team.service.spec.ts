import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { TeamService } from './team.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Team } from '../../classes/team';

describe('TeamService', () => {
  let service: TeamService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamService],
    });
    service = TestBed.get(TeamService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get a team successfully', () => {
    service.getTeam(1, 1).subscribe((data: any) => {
      expect(data.name).toBe('Test team');
    });

    const req = httpMock.expectOne(environment.baseApiUrl + 'leagues/1/teams/1', 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush({
      name: 'Test team'
    });

    httpMock.verify();
  });

  it('should post the correct team', () => {
    const team = new Team();
    team.name = 'Test name';
    service.postTeam(1, team).subscribe((data: any) => {
      expect(data.name).toBe('Test team');
    });

    const req = httpMock.expectOne(
      environment.baseApiUrl + 'leagues/1/teams',
      'post to api'
    );
    expect(req.request.method).toBe('POST');

    req.flush({
      name: 'Test team',
    });

    httpMock.verify();
  });

  it('should put the correct data', () => {
    const team = new Team();
    team.name = 'Test name';
    team.id = 1;
    service.updateTeam(1, team).subscribe((data: any) => {
      expect(data.name).toBe('Test team2');
    });

    const req = httpMock.expectOne(
      environment.baseApiUrl + 'leagues/1/teams/1',
      'put to api'
    );
    expect(req.request.method).toBe('PUT');

    req.flush({
      name: 'Test team2',
    });

    httpMock.verify();
  });

  it('should delete the correct data', () => {
    service.deleteTeam(1, 1).subscribe((data: any) => {
      expect(data).toBeNull();
    });

    const req = httpMock.expectOne(
      environment.baseApiUrl + 'leagues/1/teams/1',
      'delete to api'
    );
    expect(req.request.method).toBe('DELETE');

    req.flush(null);

    httpMock.verify();
  });

});
