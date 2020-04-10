import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {
  chart: Chart;
  positive: number;
  negative: number;
  neutral: number;

  minPositive: number;
  maxNegative: number;

  constructor() { }

  ngOnInit(): void {
    // Para cargar de la base de datos
    this.positive = 1209;
    this.neutral = 1300;
    this.negative = 1000;
    this.minPositive = 0.7;
    this.maxNegative = -0.6;

    this.initialChart();
  }

  initialChart() {
    this.chart = new Chart('realtime', {
      type: 'pie',
      data: {
        labels: [
          'Positive comments',
          'Neutral comments',
          'Negative comments'
        ],
        datasets: [
          {
            data: [this.positive, this.neutral, this.negative],
            backgroundColor: [
              '#04ff0f',
              '#fff100',
              '#ff0100'
            ]
          }]},
      options: {
        legend: {
          position: 'bottom',
          labels: {
            fontSize: 18,
            fontFamily : 'Arial'
          }
        }
      }
    });
  }
}
