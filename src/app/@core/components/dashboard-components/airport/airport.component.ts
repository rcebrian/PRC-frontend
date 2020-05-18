import { Component, OnInit } from '@angular/core';
import {MarkersService} from '../../../services/markers.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {

  constructor() { }

  isCollapsed = false;
  isCollapsed1 = false;
  isCollapsed2 = false;
  madridMap: any;
  /*barcelonaMap: any;
  sevillaMap: any;*/

  ngOnInit(): void {
    this.mapMadrid();
    /*this.mapBarcelona();
    this.mapSevilla();*/
  }
  private mapMadrid() {
    this.madridMap = L.map('map', {
      center: [40.471926, -3.56264],
      zoom: 12.5
    });
    const marker = L.marker([40.471926, -3.56264]).addTo(this.madridMap);
  }
  /*private mapBarcelona() {
    this.barcelonaMap = L.map('map', {
      center: [41.2971, 2.07846],
      zoom: 12.5
    });
    const marker = L.marker([41.2971, 2.07846]).addTo(this.barcelonaMap);
  }
  private mapSevilla() {
    this.sevillaMap = L.map('map', {
      center: [37.4201674, -5.89311],
      zoom: 12.5
    });
    const marker = L.marker([37.4201674, -5.89311]).addTo(this.sevillaMap);
  }*/

}
