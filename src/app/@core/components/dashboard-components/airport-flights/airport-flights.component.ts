import {Component, Input, OnInit} from '@angular/core';
import {Flight} from '../airport-description/airport-description.component';

@Component({
  selector: 'app-airport-flights',
  templateUrl: './airport-flights.component.html',
  styleUrls: ['./airport-flights.component.css']
})
export class AirportFlightsComponent implements OnInit {

  @Input() flight: Flight;
  constructor() { }

  ngOnInit(): void {
  }

}
