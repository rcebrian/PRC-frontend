import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../models/airport';
import {StatsService} from '../../../services/stats.service';
import {AirportDescriptionService} from '../../../services/airport/airport-description.service';
import {ActivatedRoute} from '@angular/router';

export class Flight {
  id: number;
  airport_name: string;
  airline_name: string;
  date_time: string;
  status_name: string;
}
export class Comment {
  name: number;
  city_name: string;
  place: string;
  title: string;
  date_time: string;
  original_message: string;
  grade: string;
}

@Component({
  selector: 'app-airport-description',
  templateUrl: './airport-description.component.html',
  styleUrls: ['./airport-description.component.css']
})
export class AirportDescriptionComponent implements OnInit {

  constructor(private airportDescription: AirportDescriptionService, private route: ActivatedRoute) { }
  isCollapsed = true;
  flights: Array<Flight>;
  comments: Array<Comment>;
  airport_id: string;
  airport_name: string;

  ngOnInit(): void {
    this.getIDfromURL();
    this.getFlights();
    this.getComments();
  }
  getIDfromURL() {
    this.route.paramMap.subscribe(params => {
      this.airport_id = params.get('airport_id');
    });
  }
  getFlights() {
    this.airportDescription.getFlights(this.airport_id).subscribe(
      (data: Array<Flight>) => {
        this.flights = data;
        console.log(data[0]);
      },
      error => {
        alert(error.error.errors);
      }
    );
  }
  getComments() {
    this.airportDescription.getComments(this.airport_id).subscribe(
      (data: Array<Comment>) => {
        this.comments = data;
        console.log(data[0]);
      },
      err => {
        console.log(err);
      }
    );
  }
}
