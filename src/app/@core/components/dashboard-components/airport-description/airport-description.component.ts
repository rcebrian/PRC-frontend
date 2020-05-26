import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../models/airport';
import {StatsService} from '../../../services/stats.service';
import {AirportDescriptionService} from '../../../services/airport/airport-description.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user';
import {TokenStorageService} from '../../../services/auth/token-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export class Flight {
  id: number;
  airport_name: string;
  airline_name: string;
  date_time: string;
  status_name: string;
  prediction: number;
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

  constructor(private tokenStorage: TokenStorageService, private airportDescription: AirportDescriptionService,
              private route: ActivatedRoute) { }
  user: User;
  isCollapsed = true;
  flights: Array<Flight>;
  comments: Array<Comment>;
  airport_id: string;
  pageFlights: number = 1;
  pageComments: number = 1;
  commentForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
    date_time: new FormControl('', [Validators.required]),
    grade: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
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
  insertUserComment() {
    this.airportDescription.insertUserComment(this.commentForm.value.title, this.commentForm.value.message, this.commentForm.value.date_time,
      parseFloat(this.commentForm.value.grade), this.airport_id).subscribe(
      data => {
        alert('Comment saved correctly');
      },
      error => {
        alert(error.error.error);
      }
    );
  }
}
