import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { PlayerService } from './player.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Team } from '../../classes/team';
import { Player } from '../../classes/player';

describe('PlayerService', () => {
  let service: PlayerService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlayerService],
    });
    service = TestBed.get(PlayerService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get a player successfully', () => {
    service.getPlayer(1, 1, 1).subscribe((data: any) => {
      expect(data.firstName).toBe('Test player');
    });

    const req = httpMock.expectOne(environment.baseApiUrl + 'leagues/1/teams/1/players/1', 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush({
      firstName: 'Test player'
    });

    httpMock.verify();
  });

  it('should put the correct data', () => {
    const player = new Player();
    player.firstName = 'Test';
    player.lastName = 'name';
    player.speed = 25;
    player.agility = 20;
    player.strength = 15;
    player.salary = 1000;
    player.id = 1;

    service.updatePlayer(1, 1, player).subscribe((data: any) => {
      expect(data.name).toBe('Test');
    });

    const req = httpMock.expectOne(
      environment.baseApiUrl + 'leagues/1/teams/1/players/1',
      'put to api'
    );
    expect(req.request.method).toBe('PUT');

    req.flush({
      name: 'Test',
    });

    httpMock.verify();
  });

  it('should delete the correct data', () => {
    service.deletePlayer(1, 1, 1).subscribe((data: any) => {
      expect(data).toBeNull();
    });

    const req = httpMock.expectOne(
      environment.baseApiUrl + 'leagues/1/teams/1/players/1',
      'delete to api'
    );
    expect(req.request.method).toBe('DELETE');

    req.flush(null);

    httpMock.verify();
  });

});
