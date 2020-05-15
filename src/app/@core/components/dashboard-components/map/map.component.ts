import { Component, AfterViewInit } from '@angular/core';
import { MarkersService } from '../../../services/markers.service';

import * as L from 'leaflet';

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
  selector: 'app-map',
  template: `
  <div id="map">
  </div>
  `,
  styles: [`#map {height: 500px;width: 100%;}`]
})
export class MapComponent implements AfterViewInit {


  private map;

  constructor(private markers: MarkersService) { }

  ngAfterViewInit(): void {
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