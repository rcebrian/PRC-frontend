import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../../services/stats.service';
import { Stat } from '../../../models/stats.model';
import {MarkersService} from '../../../services/markers.service';

import * as L from 'leaflet';
import {Airport} from "../../../models/airport";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  stats: Stat[];
  dashboardMap: any;
  airportsRight: Airport[] = [];
  airportsLeft: Airport[] = [];

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
        for (let i = 0; i < res.data.length; i++) {
          let a = res.data[i]
          if (i%2 === 0) {
              this.airportsLeft.push(a)
          } else {
            this.airportsRight.push(a)
          }
          const marker = L.marker([a.airport_lat, a.airport_lon]).addTo(this.dashboardMap);
        }
        console.log(this.airportsRight)
      },
      err => {
        console.log(err);
      }
    );
  }
}
