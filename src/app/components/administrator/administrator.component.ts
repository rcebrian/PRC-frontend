import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {AdminService} from 'src/app/services/admin/admin.service';
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
  // Chart
  chart: Chart;
  positive: number;
  negative: number;
  neutral: number;
  minPositive: number;
  maxNegative: number;

  // Create Model
  algorithms:  Array<Algorithm>;
  algorithmDescription: String = "";


  // Select Model
  interval;
  selectedAlgorithm: number;
  selectedAlgorithmModel: number;
  selectedModel: number;
  models:  Array<Model>;
  dateArrayModels: Array<Model>;
  selectModel: Model;

  // Btn create model
  buttonDisabledModel: boolean = false;
  buttonModelStr: string = 'Create';

  // Btn update model
  buttonDisabledUpdate: boolean = false;
  buttonUpdateStr: string = 'Apply';

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
  constructor(private adminService: AdminService) { }

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
    // @ts-ignore
    this.interval = setInterval(this.getLastModels.bind(this), 3000);
  }

  //-------------------------Create new training model-----------------------------
  onChangeAlgorithm(id){
    this.selectedAlgorithm = id.value;
    this.algorithmDescription = this.algorithms[id.value].description;
  }

  getAlgorithms(){
    this.adminService.getAlgorithms().subscribe(
      (data:Array<Algorithm>) => {
        this.getAlgorithmData(data);
      },
      error => {
        alert(`An error occurred with the server connection`);
      }
    );
  }

  getAlgorithmData(data){
    this.algorithms = data;
    this.selectedAlgorithm = 0;
    this.algorithmDescription = this.algorithms[0].description;
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

      this.buttonDisabledModel = true;
      this.buttonModelStr = 'Creating...'
      clearInterval(this.interval);
      this.adminService.createModel(array_characteristic, startDate, endDate, this.selectedAlgorithm).subscribe(
          (data:any) => {
            this.buttonDisabledModel = false;
            this.buttonModelStr = 'Create'
            this.interval = setInterval(this.getLastModels.bind(this), 2000);
          },
          error => {
            alert(`An error occurred with the server connection`);
            console.log(error);
            this.buttonDisabledModel = false;
            this.buttonModelStr = 'Created'
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
  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------

  //-----------------------Change selected training model---------------------------
  onChangeModelType(id){
    this.selectedAlgorithmModel = id;
    let array: Array<Model> = [];
    this.models.forEach(x =>{if(x.type==this.selectedAlgorithmModel){array.push(x);}});
    this.dateArrayModels = array;
    if (this.dateArrayModels.length != 0){
      this.onChangeModelDate(this.dateArrayModels[0].id);
    } else {
      this.selectModel = null;
      console.log(1);
    }
  }

  onChangeModelDate(id){
    this.selectModel = this.dateArrayModels.find(element => element.id == id);
  }

  getModels(){
    this.adminService.getModels().subscribe(
      (data:Array<Model>) => {
        this.getModelData(data);
      },
      error => {
        alert(`An error occurred with the server connection`);
      }
    );
  }

  addModel(data){
    data.forEach(model => this.models.push(model));

    if (this.dateArrayModels.length > 0){
      let array: Array<Model> = [];
      this.models.forEach(x =>{if(x.type==this.dateArrayModels[0].type){array.push(x);}});
      this.dateArrayModels = array;
    }
  }

  getModelData(data){
    this.models = data;

    if (this.dateArrayModels == null)
      this.selectedModel = 0;
    this.onChangeModelType(0);
  }

  getLastModels(){
    if (this.models != null){
      let max:number = 0;
      this.models.forEach(model => {if(model.id > max){max = model.id}});
      this.adminService.getLastModels(max).subscribe(
        (data:Array<Model>) => {
          if (data.length != 0){
            this.addModel(data);
          }
        },
        error => {
          alert(`An error occurred with the server connection`);
        }
      );
    }
  }

  selectUseModel(){
    if (this.selectModel != null){
      this.buttonDisabledUpdate = true;
      this.buttonUpdateStr = 'Updating...'
      this.adminService.setModelInUse(this.selectModel.id).subscribe(
        (data:any) => {
          this.buttonDisabledUpdate = false;
          this.buttonUpdateStr = 'Apply'
        },
        error => {
          alert(`An error occurred with the server connection`);
          console.log(error);
          this.buttonDisabledUpdate = false;
          this.buttonUpdateStr = 'Apply'
        }
      );
    } else {
      console.log('error');
    }
  }
  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------

  //-----------------------------Sentiment analysis--------------------------------
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
