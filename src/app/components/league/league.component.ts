import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { LeagueDataSource } from './league-datasource';
import { ActivatedRoute } from '@angular/router';
import { LeagueService } from '../../services/league/league.service';
import { League } from '../../classes/league';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: LeagueDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  leagueId: number;

  constructor(private route: ActivatedRoute, private leagueService: LeagueService) { }

  ngOnInit() {
    this.dataSource = new LeagueDataSource(this.paginator, this.sort);
    this.leagueId = this.route.snapshot.params.leagueId;
  }

}
