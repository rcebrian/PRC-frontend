import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../../services/stats.service';
import { Stat } from '../../../models/stats.model';
import {MarkersService} from '../../../services/markers.service';

import * as L from 'leaflet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  stats: Stat[];
  dashboardMap: any;

  constructor(private statsService: StatsService, private markers: MarkersService) { }

  ngOnInit(): void {
    this.getStats();
    this.initMap();
    this.getMarkers();
  }

  getStats() {
    this.statsService.dailyFlightsStats().subscribe(res => { this.stats = res.data; });
  }
  private initMap(): void {
    this.dashboardMap = L.map('map', {
      center: [40.471926, -3.56264],
      zoom: 5
    });
  }

  getMarkers() {
    this.markers.getMarkers().subscribe(
      res => {
        for (const c of res.data) {
          const marker = L.marker([c.latitude, c.longitude]).addTo(this.dashboardMap);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
