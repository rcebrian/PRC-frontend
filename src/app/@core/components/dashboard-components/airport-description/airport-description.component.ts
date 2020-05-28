import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
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
  selectStartHour;
  selectFinishHour;
  today: Date = new Date();
  fiveDaysAgo: Date = new Date(this.today.getTime() - 5 * (1440 * 60000));
  dates;
  selectDate;
  selectFlights;

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
    this.initFilterVariables();
    this.getIDfromURL();
    this.getFlights();
    this.getComments();
  }

  initFilterVariables() {
    this.dates = this.getDates(this.fiveDaysAgo, this.today);
    this.selectDate = this.dates[5];
    this.user = this.tokenStorage.getUser();
    const startTime = new Date(this.today.getTime() - 180 * 60000);
    this.selectStartHour = ('0' + startTime.getHours().toString()).slice(-2) + ':00';
    const finishTime = new Date(this.today.getTime() + 180 * 60000);
    this.selectFinishHour = ('0' + finishTime.getHours().toString()).slice(-2) + ':00';
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
          this.filterFlights();
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
        this.getComments();
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

  getDates(startDate, stopDate) {
    const dateArray = [];
    let currentDate = moment(startDate);
    stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push( moment(currentDate).format('YYYY-MM-DD') );
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }

  filterFlights() {
    const flights = [];
    const startTime = parseInt(this.selectStartHour.substring(0, 2));
    const endTime = parseInt(this.selectFinishHour.substring(0, 2));
    this.flights.forEach(element => {
      const time = parseInt(moment(element.date_time).format('H'));
      console.log(startTime);

      if (element.date_time.match(this.selectDate) && time >= startTime && time < endTime) {
        flights.push(element);
      }
    });
    this.selectFlights = flights;
  }
}
