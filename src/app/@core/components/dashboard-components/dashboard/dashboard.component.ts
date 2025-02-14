import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../../services/stats.service';
import { Stat } from '../../../models/stats.model';
import {MarkersService} from '../../../services/markers.service';

import * as L from 'leaflet';
import {Airport} from '../../../models/airport';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NameId} from '../../../models/name-id';

@Component({
  styleUrls: ['./dashboard.component.scss'],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  stats: Stat[];
  dashboardMap: any;
  airportsRight: Airport[] = [];
  airportsLeft: Airport[] = [];
  airports: Array<NameId>;
  airportForm = new FormGroup({
    airportId: new FormControl('', [Validators.required])
  });
  pageActual: number = 1;

  constructor(private statsService: StatsService, private markers: MarkersService, private router: Router) { }

  ngOnInit(): void {
    this.getAirports();
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
          const a = res.data[i];
          if (i % 2 === 0) {
              this.airportsLeft.push(a);
          } else {
            this.airportsRight.push(a);
          }
          console.log(a.id)
          const marker = L.marker([a.airport_lat, a.airport_lon]).addTo(this.dashboardMap).on('click', () => this.router.navigateByUrl(`/airports/${res.data[i].airport_id}`));
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getAirports() {
    this.statsService.getAirports().subscribe(
      (data: Array<NameId>) => {
        this.setAirportValue(data);
      },
      error => {
        alert(error.error.errors);
      }
    );
  }

  setAirportValue(data: Array<NameId>) {
    this.airports = data;
  }

  selectAirport() {
    this.router.navigateByUrl('/airports/' + this.airportForm.value.airportId);
  }
}
