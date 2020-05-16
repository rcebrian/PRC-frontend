import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../../services/stats.service';
import { Stat } from '../../../models/stats.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  stats: Stat[];

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.getStats();
  }

  getStats() {
    this.statsService.dailyFlightsStats().subscribe(res => { this.stats = res.data; });
  }
}
