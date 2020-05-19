import { Component, OnInit } from '@angular/core';
import {MarkersService} from '../../../services/markers.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-airport-description',
  templateUrl: './airport-description.component.html',
  styleUrls: ['./airport-description.component.css']
})
export class AirportDescriptionComponent implements OnInit {

  constructor() { }
  madridMap: any;
  isCollapsed = true;

  ngOnInit(): void {
    this.mapMadrid();
  }
  private mapMadrid() {
    this.madridMap = L.map('map', {
      center: [40.471926, -3.56264],
      zoom: 12.5
    });
    const marker = L.marker([40.471926, -3.56264]).addTo(this.madridMap);
  }

}
