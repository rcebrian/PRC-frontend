import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {AnalysisService} from 'src/app/services/analysis.service';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';

import { AppDateAdapter, APP_DATE_FORMATS } from './format-datapicker';

export class Algorithm {
  id: number;
  name: string;
  description: string;
}

export class Model {
  id: number;
  type: number;
  date: string;
  report_num_rows: number;
  report_precision_0: number;
  report_precision_1: number;
  report_recall_0: number;
  report_recall_1: number;
  report_f1_score_0: number;
  report_f1_score_1: number;
  report_accuracy_precision: number;
  report_accuracy_recall: number;
  report_accuracy_f1_score: number;

}
@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
  providers: [{provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})

export class AdministratorComponent implements OnInit {
  chart: Chart;
  positive: number;
  negative: number;
  neutral: number;

  minPositive: number;
  maxNegative: number;

  selectedAlgorithm: number;
  selectedAlgorithmModel: number;
  selectedModel: number;
  algorithms:  Array<Algorithm>;
  models:  Array<Model>;
  dateArrayModels: Array<Model>;
  algorithmDescription: String = "";

  // Errors
  characteristicsError: String;

  //Dates
  todayDate:Date = new Date();
  startDateStr: String;
  endDateStr: String;

  // Create model train
  date: boolean = false;
  time: boolean = false;
  id: boolean = false;
  airline_id: boolean = false;
  city_id: boolean = false;
  airport_id: boolean = false;
  temperature: boolean = false;
  humidity: boolean = false;
  wind_speed: boolean = false;
  wind_direction: boolean = false;
  pressure: boolean = false;
  characteristic: Array<string> = ["id","date", "time","airline_id","city_id","airport_id","temperature",
    "humidity","pressure","wind_direction","wind_speed","delay"];
  constructor(private analysisService: AnalysisService) { }

  ngOnInit(): void {
    // Para cargar de la base de datos
    this.positive = 1209;
    this.neutral = 1300;
    this.negative = 1000;
    this.minPositive = 0.7;
    this.maxNegative = -0.6;

    this.initialChart();
    this.getAlgorithms();
    this.getModels();
  }

  onChangeAlgorithm(id){
    this.selectedAlgorithm = id.value;
    this.algorithmDescription = this.algorithms[id.value].description;
  }

  onChangeModelType(id){
    this.selectedAlgorithmModel = id.value;
    let array: Array<Model> = [];
    this.models.forEach(x =>{if(x.type==this.selectedAlgorithmModel){array.push(x);}});
    this.dateArrayModels = array;
  }

  onChangeModelDate(id){
    console.log(id.value);
  }

  getAlgorithms(){
    this.analysisService.getAlgorithms().subscribe(
      (data:Array<Algorithm>) => {
        this.getAlgorithmData(data);
      },
      error => {
        alert(`An error occurred with the server connection`);
      }
    );
  }

  getModels(){
    this.analysisService.getModels().subscribe(
      (data:Array<Model>) => {
        this.getModelData(data);
      },
      error => {
        alert(`An error occurred with the server connection`);
      }
    );
  }

  getAlgorithmData(data){
    this.algorithms = data;
    this.selectedAlgorithm = 0;
  }

  getModelData(data){
    this.models = data;
    this.selectedModel = 0;
    this.algorithmDescription = this.algorithms[0].description;
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

  createModel(){
    let selected_characteristic = [this.id, this.date, this.time, this.airline_id, this.city_id, this.airport_id,
      this.temperature, this.humidity, this.pressure, this.wind_direction, this.wind_speed, true];
    let array_characteristic: Array<string> = [];
    for (let i = 0; i<this.characteristic.length; i++){
      if (selected_characteristic[i]){
        array_characteristic.push(this.characteristic[i]);
      }
    }

    if (array_characteristic.length == 1) {
      this.characteristicsError = 'You must select at least one characteristic.';
    } else {
      this.characteristicsError = null;
    }

    if (this.startDateStr != null && this.endDateStr != null) {
      let startDate = this.convertDate(this.startDateStr);
      let endDate = this.convertDate(this.endDateStr);
      // Todo ok, lanzar el modelo
       console.log(JSON.stringify(array_characteristic))

      this.analysisService.createModel(array_characteristic, startDate, endDate, this.selectedAlgorithm).subscribe(
          (data:any) => {
            console.log(data);
          },
          error => {
            alert(`An error occurred with the server connection`);
            console.log(error);
          }
        );

      }
  }

  convertDate(str) {
    let date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
  }
}
