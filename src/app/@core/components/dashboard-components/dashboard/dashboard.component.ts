import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../../services/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  stats: any = {};

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.getStats();
  }

  getStats() {
    this.statsService.dailyFlightsStats().subscribe(
      res => {
        this.stats = res.data;
      }
    );
  }

}
