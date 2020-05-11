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
  startDateStr: Date;
  endDateStr: Date;

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

  //Update train data
  yesterday: Date = new Date();
  minDateTrain: Date = new Date();
  dateStrTrain: Date;
  airportIdTrain: number;
  errorAirportId: string;
  buttonDisabledAllTrainData: boolean = false;
  buttonUpdateAllTrainStr: string = 'Update all';
  buttonDisabledFlightTrainData: boolean = false;
  buttonUpdateFlightTrainStr: string = 'Flights';
  buttonDisabledWeatherTrainData: boolean = false;
  buttonUpdateWeatherTrainStr: string = 'Weather';
  selectButtonTrain: number;

  //Update today data
  airportIdNow: number;
  errorAirportNow: string;
  buttonDisabledAllNowData: boolean = false;
  buttonUpdateAllNowStr: string = 'Update all';
  buttonDisabledFlightNowData: boolean = false;
  buttonUpdateFlightNowStr: string = 'Flights';
  buttonDisabledWeatherNowData: boolean = false;
  buttonUpdateWeatherNowStr: string = 'Weather';
  selectButtonNow: number;

  //Update today data
  cityId: number;
  errorCityIdError: string;


  //Update url data
  countryId: number;
  errorUrl: string;
  buttonDisabledUrlData: boolean = false;
  buttonUpdateUrlStr: string = 'Update';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    // Para cargar de la base de datos
    this.positive = 1209;
    this.neutral = 1300;
    this.negative = 1000;
    this.minPositive = 0.7;
    this.maxNegative = -0.6;

    this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.minDateTrain.setDate(this.minDateTrain.getDate() - 5);
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
        alert(error.error.errors);
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
          alert(error.error.errors);
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
          alert(error.error.errors);
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

  //-----------------------------Update train data---------------------------------
  updateTrainData(){
    if (this.airportIdTrain != null ){
      this.errorAirportId = null;
      if (this.dateStrTrain != null) {
        let date = this.convertDate(this.dateStrTrain);
        if (this.selectButtonTrain == 0){ // Flights
          this.buttonDisabledFlightTrainData = true;
          this.buttonUpdateFlightTrainStr = 'Updating...';
          this.updateFlightsHistorical(date);
        } else if (this.selectButtonTrain == 1){ //Weather
          this.buttonDisabledWeatherTrainData= true;
          this.buttonUpdateWeatherTrainStr = 'Updating...';
          this.updateWeathersHistorical(date);
        } else { //Both
          this.buttonDisabledAllTrainData = true;
          this.buttonUpdateAllTrainStr = 'Updating...';
          this.updateFlightsHistorical(date);
        }
      }
    } else {
      this.errorAirportId = "Please, enter an Airport ID"
    }
  }

  updateFlightsHistorical(date){
    this.adminService.updateHistoricalFlightsData(date, this.airportIdTrain).subscribe(
      (data:any) => {
        if (this.selectButtonTrain == 0){ // Flights
          this.buttonDisabledFlightTrainData = false;
          this.buttonUpdateFlightTrainStr = 'Flights';
        } else {
            this.updateWeathersHistorical(date);
        }
      },
      error => {
        alert(error.error.errors);
        if (this.selectButtonTrain == 0){ // Flights
          this.buttonDisabledFlightTrainData = false;
          this.buttonUpdateFlightTrainStr = 'Flights';
        } else { //Both
          this.buttonDisabledAllTrainData = false;
          this.buttonUpdateAllTrainStr = 'Update All';
        }
      }
    );
  }

  updateWeathersHistorical(date){
    this.adminService.updateHistoricalWeatherData(date, this.airportIdTrain).subscribe(
      (data:any) => {
        if (this.selectButtonTrain == 1){ //Weather
          this.buttonDisabledWeatherTrainData = false;
          this.buttonUpdateWeatherTrainStr = 'Weather';
        } else { //Both
          this.buttonDisabledAllTrainData = false;
          this.buttonUpdateAllTrainStr = 'Update All';
        }
      },
      error => {
        alert(error.error.errors);
        if (this.selectButtonTrain == 1){ //Weather
          this.buttonDisabledWeatherTrainData = false;
          this.buttonUpdateWeatherTrainStr = 'Weather';
        } else { //Both
          this.buttonDisabledAllTrainData = false;
          this.buttonUpdateAllTrainStr = 'Update All';
        }
      }
    );
  }
  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------

  //-----------------------------Update today data---------------------------------
  updateNowData(){
    if (this.airportIdNow != null ){
      if (this.selectButtonNow == 0){ // Flights
        this.buttonDisabledFlightNowData = true;
        this.buttonUpdateFlightNowStr = 'Updating...';
        this.updateFlightsFuture();
      } else if (this.selectButtonNow == 1){ //Weather
        this.buttonDisabledWeatherNowData= true;
        this.buttonUpdateWeatherNowStr = 'Updating...';
        this.updateWeathersFuture();
      } else { //Both
        this.buttonDisabledAllNowData = true;
        this.buttonUpdateAllNowStr = 'Updating...';
        this.updateFlightsFuture();
      }
    } else {
      this.errorAirportNow = "Please, enter an Airport ID"
    }
  }

  updateFlightsFuture(){
    this.adminService.updateFutureFlightsData(this.airportIdNow).subscribe(
      (data:any) => {
        if (this.selectButtonNow == 0){ // Flights
          this.buttonDisabledFlightNowData = false;
          this.buttonUpdateFlightNowStr = 'Flights';
        } else {
          this.updateWeathersFuture();
        }
      },
      error => {
        alert(error.error.errors);
        if (this.selectButtonNow == 0){ // Flights
          this.buttonDisabledFlightNowData = false;
          this.buttonUpdateFlightNowStr = 'Flights';
        } else { //Both
          this.buttonDisabledAllNowData = false;
          this.buttonUpdateAllNowStr = 'Update All';
        }
      }
    );
  }

  updateWeathersFuture(){
    this.adminService.updateFutureWeatherData(this.airportIdNow).subscribe(
      (data:any) => {
        if (this.selectButtonNow == 1){ //Weather
          this.buttonDisabledWeatherNowData = false;
          this.buttonUpdateWeatherNowStr = 'Weather';
        } else { //Both
          this.buttonDisabledAllNowData = false;
          this.buttonUpdateAllNowStr = 'Update All';
        }
      },
      error => {
        alert(error.error.errors);
        if (this.selectButtonNow == 1){ //Weather
          this.buttonDisabledWeatherNowData = false;
          this.buttonUpdateWeatherNowStr = 'Weather';
        } else { //Both
          this.buttonDisabledAllNowData = false;
          this.buttonUpdateAllNowStr = 'Update All';
        }
      }
    );
  }
  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------

  //-----------------------------Update comment data---------------------------------
  updateCommentData(){
    if (this.cityId != null ){
    } else {
      this.errorCityIdError = "Please, enter an City ID"
    }
  }
  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------

  //-----------------------------Update URL data-----------------------------------
  updateUrlData(){
    if (this.countryId != null ){
      this.errorUrl = '';
      this.buttonDisabledUrlData = true;
      this.buttonUpdateUrlStr = 'Updating...'
      this.adminService.updateUrlFlights(this.countryId).subscribe(
        (data:any) => {
          this.buttonDisabledUrlData = false;
          this.buttonUpdateUrlStr = 'Update'
        },
        error => {
          alert(error.error.errors);
          this.buttonDisabledUrlData = false;
          this.buttonUpdateUrlStr = 'Update'
        }
      );
    } else {
      this.errorUrl = "Please, enter an Country ID"
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
