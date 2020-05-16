import { Component, OnInit } from '@angular/core';
import { AdminService} from '../../../../../services/admin/admin.service';

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
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  // Dates
  todayDate: Date = new Date();
  strTodayDate: string;
  startDateStr: string;
  endDateStr: string;

  // Select Model
  interval;
  selectedAlgorithm: number;
  selectedAlgorithmModel: number;
  selectedModel: number;
  models: Array<Model>;
  dateArrayModels: Array<Model>;
  selectModel: Model;

  // Errors
  characteristicsError: String;

  // Create Model
  algorithms: Array<Algorithm>;
  algorithmDescription: String = '';

  // Btn create model
  buttonDisabledModel: boolean = false;
  buttonModelStr: string = 'Create';

  // Btn update model
  buttonDisabledUpdate: boolean = false;
  buttonUpdateStr: string = 'Apply';

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

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.strTodayDate = this.convertDate(this.todayDate);
    console.log(this.strTodayDate);
    this.getAlgorithms();
  }

  // -------------------------Create new training model-----------------------------
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
    }

    if (this.startDateStr != null && this.endDateStr != null) {
      this.buttonDisabledModel = true;
      this.buttonModelStr = 'Creating...';
      clearInterval(this.interval);
      this.adminService.createModel(array_characteristic, this.startDateStr, this.endDateStr, this.selectedAlgorithm).subscribe(
        (data: any) => {
          this.buttonDisabledModel = false;
          this.buttonModelStr = 'Create';
          this.interval = setInterval(this.getLastModels.bind(this), 2000);
        },
        error => {
          alert(error.error.erros);
          console.log(error);
          this.buttonDisabledModel = false;
          this.buttonModelStr = 'Created';
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

  getLastModels() {
    if (this.models != null) {
      let max = 0;
      this.models.forEach(model => {
        if (model.id > max) {
          max = model.id;
        }
      });
      this.adminService.getLastModels(max).subscribe(
        (data: Array<Model>) => {
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

  addModel(data) {
    data.forEach(model => this.models.push(model));

    if (this.dateArrayModels.length > 0) {
      const array: Array<Model> = [];
      this.models.forEach(x => {
        if (x.type === this.dateArrayModels[0].type) {
          array.push(x);
        }
      });
      this.dateArrayModels = array;
    }
  }

}
