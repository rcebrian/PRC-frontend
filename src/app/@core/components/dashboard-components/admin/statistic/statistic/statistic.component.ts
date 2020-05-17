import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminService} from '../../../../../services/admin/admin.service';
import {Model} from '../../model/model/model.component';

export class GroupFlightData {
  groupDate: string;
  delay: number;
  countDelay: number;
  prediction: number;
  countPrediction: number;
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

  // Dates
  todayDate: Date = new Date();
  weekAgo: Date = new Date();
  strTodayDate: string;

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: any[];

  // Pie
  public pieChartLabels: string[] = ['Positive comments', 'Neutral comments', 'Negative comments'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.strTodayDate = this.convertDate(this.todayDate);
    this.getFlightsInitData();
  }

  getFlightsData() {
    this.adminService.getFlightsGroupData(this.flightsDataForm.value.startDate, this.flightsDataForm.value.endDate).subscribe(
      (data: Array<GroupFlightData>) => {
        this.setValuesbarChart(data);
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
    console.log(this.strTodayDate);
    this.adminService.getFlightsGroupData(initData, yesterday).subscribe(
      (data: Array<GroupFlightData>) => {
        this.setValuesbarChart(data);
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

  setValuesbarChart(data: Array<GroupFlightData>) {
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
}

