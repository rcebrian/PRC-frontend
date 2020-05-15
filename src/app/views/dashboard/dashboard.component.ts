import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { MarkersService } from '../../@core/services/markers.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  private map;

  constructor(private markers: MarkersService) { }

  ngOnInit(): void {
    this.initMap();
    this.getMarkers();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [40.471926, -3.56264],
      zoom: 5
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

  }

  getMarkers() {
    this.markers.getMarkers().subscribe(
      res => {
        for (const c of res) {
          const marker = L.marker([c.latitude, c.longitude]).addTo(this.map);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
