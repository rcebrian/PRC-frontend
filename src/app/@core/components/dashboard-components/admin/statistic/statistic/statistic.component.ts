import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../../../services/admin/admin.service';
import { CommentData } from '../../../../../models/comment-data';
import { GroupFlightData} from '../../../../../models/group-flight-data';
import { City} from '../../../../../models/city';
import { AirportId} from '../../../../../models/airport-id';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})

export class StatisticComponent implements OnInit {
  flightsDataForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });

  commentsDataForm = new FormGroup({
    cityId: new FormControl('', [Validators.required]),
  });

  // Cities
  cities: Array<City>;
  dataComments: Array<CommentData>;

  // Group airports
  airports: Array<AirportId>;
  airportId = -1; // Todos los aeropuertos

  // Flights
  flights: Array<GroupFlightData>;

  radioBtn: string = 'sentiment';

  // Ranges
  positiveSentiment: number = 0.7;
  negativeSentiment: number = 0.3;
  positivePolarity: number = 0.7;
  negativePolarity: number = 0;
  positiveGrade: number = 4;
  negativeGrade: number = 1.5;

  // Dates
  todayDate: Date = new Date();
  weekAgo: Date = new Date();
  strTodayDate: string;

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false
  };
  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[];
  inTimeColor: string = '#1b5e20';
  predictInTimeColor: string = '#9ccc65';
  delayedColor: string = '#b71c1c';
  predictDelayedColor: string = '#e57373';
  public barCharColors: any[];

  // Pie
  public pieChartLabels: string[] = ['Positive comments', 'Neutral comments', 'Negative comments'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';
  public doughnutColors: any[] = [
    { backgroundColor: ['#a5d6a7', '#fff59d', '#e57373']},
    { borderColor: ['#FEFFC9', '#FEFFC9', '#FEFFC9'] }];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.strTodayDate = this.convertDate(this.todayDate);
    this.getFlightsInitData();
    this.getCities();
  }

  // -----------------------Bar Char -> statistic flights---------------------------
  getFlightsData() {
    this.adminService.getFlightsGroupData(this.flightsDataForm.value.startDate, this.flightsDataForm.value.endDate).subscribe(
      (data: Array<GroupFlightData>) => {
        this.setFlights(data);
      },
      error => {
        alert(error.error.errors);
      }
    );
  }

  getFlightsInitData() {
    this.weekAgo.setDate(this.weekAgo.getDate() - 1);
    const yesterday = this.convertDate(this.weekAgo);

    this.weekAgo.setDate(this.weekAgo.getDate() - 6);
    const initData = this.convertDate(this.weekAgo);
    this.adminService.getFlightsGroupData(initData, yesterday).subscribe(
      (data: Array<GroupFlightData>) => {
        this.setFlights(data);
      },
      error => {
        alert(error.error.errors);
      }
    );

    this.adminService.getFlightsAirports(initData, yesterday).subscribe(
      (data: Array<AirportId>) => {
        this.setValuesAirports(data);
      },
      error => {
        alert(error.error.errors);
      }
    );
  }

  setValuesAirports(data: Array<AirportId>) {
    this.airports = data;
  }

  setFlights(data: Array<GroupFlightData>) {
    this.flights = data;
    this.setValuesBarChart();
  }

  setValuesBarChart() {
    const dataLabels = [];
    const dataInTime = [];
    const dataInTimePrediction = [];
    const dataDelayed = [];
    const dataDelayedPrediction = [];
    const inTimeColor = [];
    const predictInTimeColor = [];
    const delayedColor = [];
    const predictDelayedColor = [];

    if  (this.airportId === -1) { // Todos los aeropuertos
      this.flights.forEach(dat => {
        if (dataLabels.indexOf(dat.groupDate) === -1) {
          dataLabels.push(dat.groupDate);
        }

        if (dat.delay === 0) {
          dataInTime.push(dat.countDelay);
          inTimeColor.push(this.inTimeColor);
        } else if (dat.delay === 1) {
          dataDelayed.push(dat.countDelay);
          delayedColor.push(this.delayedColor);
        }

        if (dat.prediction === 0) {
          dataInTimePrediction.push(dat.countPrediction);
          predictInTimeColor.push(this.predictInTimeColor);
        } else if (dat.prediction === 1) {
          dataDelayedPrediction.push(dat.countPrediction);
          predictDelayedColor.push(this.predictDelayedColor);
        }
      });
    } else {
      this.flights.forEach(dat => {
        if (dat.airport_id === this.airportId) {
          if (dataLabels.indexOf(dat.groupDate) === -1) {
            dataLabels.push(dat.groupDate);
          }

          if (dat.delay === 0) {
            dataInTime.push(dat.countDelay);
            inTimeColor.push(this.inTimeColor);
          } else if (dat.delay === 1) {
            dataDelayed.push(dat.countDelay);
            delayedColor.push(this.delayedColor);
          }

          if (dat.prediction === 0) {
            dataInTimePrediction.push(dat.countPrediction);
            predictInTimeColor.push(this.predictInTimeColor);
          } else if (dat.prediction === 1) {
            dataDelayedPrediction.push(dat.countPrediction);
            predictDelayedColor.push(this.predictDelayedColor);
          }
        }
      });
    }

    this.barCharColors = [
      { backgroundColor: inTimeColor},
      { backgroundColor: predictInTimeColor},
      { backgroundColor: delayedColor},
      { backgroundColor: predictDelayedColor}];

    this.barChartLabels = dataLabels;
    this.barChartData = [
      {data: dataInTime, label: 'In time'},
      {data: dataInTimePrediction, label: 'Predict in time'},
      {data: dataDelayed, label: 'Delayed Flights'},
      {data: dataDelayedPrediction, label: 'Predict Delayed Flights'}
    ];
  }

  setBarGraphic(airportId) {
    if (airportId == null) {
      this.airportId = -1;
    } else {
      this.airportId = airportId;
    }

    this.setValuesBarChart();
  }
  // -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -----------------------Pie Char -> statistic comments--------------------------
  getCities() {
    this.adminService.getCitiesComments().subscribe(
      (data: Array<City>) => {
        this.setCityValue(data);
      },
      error => {
        alert(error.error.errors);
      }
    );
  }

  setCityValue(data: Array<City>) {
    this.cities = data;
  }

  getCommentsData() {
    this.adminService.getCitiesData(this.commentsDataForm.value.cityId).subscribe(
      (data: Array<CommentData>) => {
        this.setValuesPieChart(data);
      },
      error => {
        alert(error.error.errors);
      }
    );
  }

  setValuesPieChart(data: Array<CommentData>) {
    this.dataComments = data;
    const positive = 0.5;
    const negative = 0;

    let positiveValues = 0;
    let negativeValues = 0;
    let neutralValues = 0;

    data.forEach(dat => {
      if (dat.polarity > positive) {
        positiveValues += 1;
      } else if (dat.polarity < negative) {
        negativeValues += 1;
      } else {
        neutralValues += 1;
      }
    });
    this.pieChartData = [positiveValues, neutralValues, negativeValues];
  }

  changeLineChart() {
    if (this.dataComments != null) {
      let positiveValues = 0;
      let negativeValues = 0;
      let neutralValues = 0;

      if (this.radioBtn === 'sentiment') {
        this.dataComments.forEach(dat => {
          if (dat.sentiment > this.positiveSentiment) {
            positiveValues += 1;
          } else if (dat.sentiment < this.negativeSentiment) {
            negativeValues += 1;
          } else {
            neutralValues += 1;
          }
        });
      } else if (this.radioBtn === 'polarity') {
        this.dataComments.forEach(dat => {
          if (dat.polarity > this.positivePolarity) {
            positiveValues += 1;
          } else if (dat.polarity < this.negativePolarity) {
            negativeValues += 1;
          } else {
            neutralValues += 1;
          }
        });
      } else {
        this.dataComments.forEach(dat => {
          if (dat.grade > this.positiveGrade) {
            positiveValues += 1;
          } else if (dat.grade < this.negativeGrade) {
            negativeValues += 1;
          } else {
            neutralValues += 1;
          }
        });
      }
      this.pieChartData = [positiveValues, neutralValues, negativeValues];
    }

  }
  radioBtnChanged() {
    this.changeLineChart();
  }
  // -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -----------------------OTHERS FUNCTIONS-------------------------------
  convertDate(str) {
    const date = new Date(str),
      month = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join('-');
  }
  // -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------
}

