import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../../../services/admin/admin.service';
import { Observable } from 'rxjs';

export interface Person {
  id: string;
  isActive: boolean;
  age: number;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  disabled?: boolean;
}


export class GroupFlightData {
  groupDate: string;
  delay: number;
  countDelay: number;
  prediction: number;
  countPrediction: number;
}

export class City {
  city: string;
  city_id: number;
}

export class CommentData {
  polarity: number;
  sentiment: number;
  grade: number;
}

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

  getFlightsData() {
    this.adminService.getFlightsGroupData(this.flightsDataForm.value.startDate, this.flightsDataForm.value.endDate).subscribe(
      (data: Array<GroupFlightData>) => {
        this.setValuesBarChart(data);
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
        this.setValuesBarChart(data);
      },
      error => {
        alert(error.error.errors);
      }
    );
  }

  convertDate(str) {
    const date = new Date(str),
      month = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join('-');
  }

  setValuesBarChart(data: Array<GroupFlightData>) {
    const dataLabels = [];
    const dataInTime = [];
    const dataInTimePrediction = [];
    const dataDelayed = [];
    const dataDelayedPrediction = [];
    data.forEach(dat => {
      if (dataLabels.indexOf(dat.groupDate) === -1) {
        dataLabels.push(dat.groupDate);
      }

      if (dat.delay === 0) {
        dataInTime.push(dat.countDelay);
      } else if (dat.delay === 1) {
        dataDelayed.push(dat.countDelay);
      }

      if (dat.prediction === 0) {
        dataInTimePrediction.push(dat.countPrediction);
      } else if (dat.prediction === 1) {
        dataDelayedPrediction.push(dat.countPrediction);
      }
    });

    this.barChartLabels = dataLabels;
    this.barChartData = [
      {data: dataInTime, label: 'In time'},
      {data: dataInTimePrediction, label: 'Predict in time'},
      {data: dataDelayed, label: 'Delayed Flights'},
      {data: dataDelayedPrediction, label: 'Predict Delayed Flights'}
    ];
  }

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
}

