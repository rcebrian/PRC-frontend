import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})

/*export class StatisticComponent implements OnInit {


}*/

export class StatisticComponent implements OnInit {
  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'In time'},
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Predict in time'},
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Delayed Flights'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Predict Delayed Flights'}
  ];

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

  constructor() { }

  ngOnInit(): void {
  }
}

