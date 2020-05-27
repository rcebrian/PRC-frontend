import { Component, OnInit } from '@angular/core';
import { AdminService} from '../../../../../services/admin/admin.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ModelTrain} from '../../../../../models/model-train';
import { Algorithm } from '../../../../../models/algorithm';
import {element} from 'protractor';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  createTrainModelForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    date: new FormControl(),
    time: new FormControl(),
    id: new FormControl(),
    airline_id: new FormControl(),
    city_id: new FormControl(),
    airport_id: new FormControl(),
    temperature: new FormControl(),
    humidity: new FormControl(),
    wind_speed: new FormControl(),
    wind_direction: new FormControl(),
    pressure: new FormControl(),
  });

  predictDataForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });

  // Dates
  todayDate: Date = new Date();
  strTodayDate: string;
  startDateStr: string;
  startDatePredict: string;
  endDateStr: string;

  // Select Model
  interval;
  selectedAlgorithm: number;
  selectedAlgorithmModel: number;
  selectedModel: number;
  models: Array<ModelTrain>;
  dateArrayModels: Array<ModelTrain>;
  selectModel: ModelTrain;

  // Errors
  characteristicsError: String;

  // Create Model
  modelInUse: string = 'Loading...';
  algorithms: Array<Algorithm>;
  algorithmDescription: String = '';

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
  characteristic: Array<string> = ['id', 'date', 'time', 'airline_id', 'city_id', 'airport_id', 'temperature',
    'humidity', 'pressure', 'wind_direction', 'wind_speed', 'delay'];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.strTodayDate = this.convertDate(this.todayDate);
    this.getAlgorithms();
    this.getModels();
    // @ts-ignore
    this.interval = setInterval(this.getLastModels.bind(this), 3000);
  }

  // -------------------------Create new training model-----------------------------
  getModelInUse() {
    this.adminService.getModelInUse().subscribe(
      (data: any) => {
        if (data.length === 0) {
          this.modelInUse = 'There is no model is use';
        } else {
          let notFound = true;
          let i = 0;
          while (notFound ) {
            if (this.algorithms[i].id === data[0].type) {
              this.modelInUse = this.algorithms[i].name + ' ' + data[0].date;
              notFound = false;
            }
            i += 1;
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onChangeAlgorithm(id) {
    this.selectedAlgorithm = id.value;
    this.algorithmDescription = this.algorithms[id.value].description;
  }

  getAlgorithms() {
    this.adminService.getAlgorithms().subscribe(
      (data: Array<Algorithm>) => {
        this.getAlgorithmData(data);
      },
      error => {
        alert(`An error occurred with the server connection`);
      }
    );
  }

  getAlgorithmData(data) {
    this.algorithms = data;
    this.selectedAlgorithm = 0;
    this.algorithmDescription = this.algorithms[0].description;
    this.getModelInUse();
  }

  createModel() {
    const selected_characteristic = [this.id, this.date, this.time, this.airline_id, this.city_id, this.airport_id,
      this.temperature, this.humidity, this.pressure, this.wind_direction, this.wind_speed, true];
    const array_characteristic: Array<string> = [];
    for (let i = 0; i < this.characteristic.length; i++) {
      if (selected_characteristic[i]) {
        array_characteristic.push(this.characteristic[i]);
      }
    }

    if (array_characteristic.length === 1) {
      this.characteristicsError = 'You must select at least one characteristic.';
    } else {
      this.characteristicsError = null;
      clearInterval(this.interval);
      this.adminService.createModel(array_characteristic, this.startDateStr, this.endDateStr, this.selectedAlgorithm).subscribe(
        (data: any) => {
          this.interval = setInterval(this.getLastModels.bind(this), 2000);
        },
        error => {
          alert(error.error.erros);
          console.log(error);
        }
      );
    }
  }

  convertDate(str) {
    const date = new Date(str),
      month = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join('-');
  }
  // -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -----------------------Change selected training model---------------------------
  onChangeModelType(id) {
    this.selectedAlgorithmModel = id;
    const array: Array<ModelTrain> = [];
    // tslint:disable-next-line:triple-equals
    this.models.forEach(x => { if (x.type == this.selectedAlgorithmModel) { array.push(x); }});
    this.dateArrayModels = array;
    if (this.dateArrayModels.length !== 0) {
      this.onChangeModelDate(this.dateArrayModels[0].id);
    } else {
      this.selectModel = null;
    }
  }

  onChangeModelDate(id) {
    this.selectModel = this.dateArrayModels.find(element => element.id === id);
  }

  getModels() {
    this.adminService.getModels().subscribe(
      (data: Array<ModelTrain>) => {
        this.getModelData(data);
      },
      error => {
        alert(error.error.errors);
      }
    );
  }

  getModelData(data) {
    this.models = data;
    if (this.dateArrayModels == null) {
      this.selectedModel = 0;
    }
    this.onChangeModelType(0);
  }

  addModel(data) {
    data.forEach(model => this.models.push(model));

    if (this.dateArrayModels.length > 0) {
      const array: Array<ModelTrain> = [];
      this.models.forEach(x => {
        if (x.type === this.dateArrayModels[0].type) {
          array.push(x);
        }
      });
      this.dateArrayModels = array;
    }
  }

  getLastModels() {
    if (this.models != null) {
      let max = 0;
      this.models.forEach(model => {if (model.id > max) {max = model.id; }});
      this.adminService.getLastModels(max).subscribe(
        (data: Array<ModelTrain>) => {
          if (data.length !== 0) {
            this.addModel(data);
          }
        },
        error => {
          alert(error.error.errors);
        }
      );
    }
  }

  selectUseModel() {
    clearInterval(this.interval);
    if (this.selectModel != null) {
      this.adminService.setModelInUse(this.selectModel.id).subscribe(
        (data: any) => {
          const model = this.dateArrayModels.find(element => element.id === this.selectModel.id);
          const algorithm = this.algorithms.find(element => element.id  == this.selectedAlgorithmModel);
          this.modelInUse = algorithm.name + ' ' + model.date;
        },
        error => {
          alert(error.error.errors);
          console.log(error);
        }
      );
    } else {
      console.log('error');
    }
    this.interval = setInterval(this.getLastModels.bind(this), 2000);
  }

  deleteModel() {
    clearInterval(this.interval);
    if (this.selectModel != null) {
      this.adminService.deleteModel(this.selectModel.id).subscribe(
        (data: any) => {
        },
        error => {
          console.log(error);
        }
      );
    }
    this.interval = setInterval(this.getLastModels.bind(this), 2000);
  }
  // -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -----------------------Predict model---------------------------
  predict() {
    clearInterval(this.interval);
    this.adminService.predictFlights(this.predictDataForm.value.startDate,
      this.predictDataForm.value.endDate).subscribe(
      (data: any) => { },
      error => {
        console.log(error);
      }
    );
    this.interval = setInterval(this.getLastModels.bind(this), 2000);
  }
  // -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------
}
