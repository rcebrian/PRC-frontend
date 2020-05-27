import {Component, Input, OnInit} from '@angular/core';
import {Airport} from '../../../models/airport';
import {StatsService} from '../../../services/stats.service';
import {AirportDescriptionService} from '../../../services/airport/airport-description.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user';
import {TokenStorageService} from '../../../services/auth/token-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../services/admin/admin.service';
import { Flight } from '../../../models/flight';
import { Comment} from '../../../models/comment';

@Component({
  selector: 'app-airport-description',
  templateUrl: './airport-description.component.html',
  styleUrls: ['./airport-description.component.css']
})
export class AirportDescriptionComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private airportDescription: AirportDescriptionService,
              private route: ActivatedRoute, private adminService: AdminService) { }
  // Filter search
  hours = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
  selectStartHour = this.hours[0];
  selectFinishHour = this.hours[1];

  user: User;
  isCollapsed = true;
  flights: Array<Flight> = [];
  comments: Array<Comment> = [];
  airport_id: string;
  pageFlights: number = 1;
  pageComments: number = 1;
  noData: boolean = true;
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
        if (this.flights.length === 0 && this.noData === true) {
          this.updateFlightsFuture();
        } else {
          this.noData = false;
        }
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
      },
      err => {
        console.log(err);
      }
    );
  }
  insertUserComment() {
    this.airportDescription.insertUserComment(this.commentForm.value.title, this.commentForm.value.message,
      this.commentForm.value.date_time,
      parseFloat(this.commentForm.value.grade), this.airport_id).subscribe(
      data => {
        alert('Comment saved correctly');
      },
      error => {
        alert(error.error.error);
      }
    );
  }

  // -----------------------------------Load new Data-------------------------------
  updateFlightsFuture() {
    this.adminService.updateFutureFlightsData(this.airport_id).subscribe(
      data => {
        this.noData = false;
        this.getFlights();
      },
      error => {
        console.log(error);
      }
    );
  }
}
