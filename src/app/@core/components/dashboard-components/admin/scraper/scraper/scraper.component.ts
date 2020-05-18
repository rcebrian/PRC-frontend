import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../../services/admin/admin.service';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

export class Model {
  name: string;
  id: number;
}

@Component({
  selector: 'app-scraper',
  templateUrl: './scraper.component.html',
  styleUrls: ['./scraper.component.css']
})

export class ScraperComponent implements OnInit {
  historyForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    airportId: new FormControl('', [Validators.required])
  });

  urlForm = new FormGroup({
    countryId: new FormControl('', [Validators.required])
  });

  forecastForm = new FormGroup({
    airportId: new FormControl('', [Validators.required])
  });

  commentForm = new FormGroup({
    cityId: new FormControl('', [Validators.required])
  });

  // Update train data
  yesterday: Date = new Date();
  yesterdayStr: string;
  minDateStr: string;
  dateStrTrain: string;
  buttonDisabledAllTrainData: boolean = false;
  buttonUpdateAllTrainStr: string = 'Update all';
  buttonDisabledFlightTrainData: boolean = false;
  buttonUpdateFlightTrainStr: string = 'Flights';
  buttonDisabledWeatherTrainData: boolean = false;
  buttonUpdateWeatherTrainStr: string = 'Weather';
  selectButtonTrain: number;

  // Update today data
  buttonDisabledAllNowData: boolean = false;
  buttonUpdateAllNowStr: string = 'Update all';
  buttonDisabledFlightNowData: boolean = false;
  buttonUpdateFlightNowStr: string = 'Flights';
  buttonDisabledWeatherNowData: boolean = false;
  buttonUpdateWeatherNowStr: string = 'Weather';
  selectButtonNow: number;

  airports: Array<Model>;
  countries: Array<Model>;
  cities: Array<Model>;

  // Update url data
  countryId: string;
  buttonDisabledUrlData: boolean = false;
  buttonUpdateUrlStr: string = 'Update';

  // Update comment data
  cityId: string;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.yesterdayStr = this.convertDate(this.yesterday);

    this.yesterday.setDate(this.yesterday.getDate() - 4);
    this.minDateStr = this.convertDate(this.yesterday);
    this.getAirports();
    this.getCountries();
    this.getCities();
  }

  // -----------------------------Update train data---------------------------------
  getAirports() {
    this.adminService.getAirports().subscribe(
      (data: Array<Model>) => {
        this.setAirportValue(data);
      },
      error => {
        alert(error.error.errors);
      }
    );
  }

  setAirportValue(data: Array<Model>) {
    this.airports = data;
  }

  updateTrainData() {
    if (this.selectButtonTrain === 0) { // Flights
      this.buttonDisabledFlightTrainData = true;
      this.buttonUpdateFlightTrainStr = 'Updating...';
      this.updateFlightsHistorical(this.historyForm.value.airportId);
    } else if (this.selectButtonTrain === 1) { // Weather
      this.buttonDisabledWeatherTrainData = true;
      this.buttonUpdateWeatherTrainStr = 'Updating...';
      this.updateWeathersHistorical(this.historyForm.value.airportId);
    } else { // Both
      this.buttonDisabledAllTrainData = true;
      this.buttonUpdateAllTrainStr = 'Updating...';
      this.updateFlightsHistorical(this.historyForm.value.airportId);
    }
  }

  updateFlightsHistorical(id) {
    this.adminService.updateHistoricalFlightsData(this.dateStrTrain, id).subscribe(
      (data: any) => {
        if (this.selectButtonTrain === 0) { // Flights
          this.buttonDisabledFlightTrainData = false;
          this.buttonUpdateFlightTrainStr = 'Flights';
        } else {
          this.updateWeathersHistorical(id);
        }
      },
      error => {
        alert(error.error.errors);
        if (this.selectButtonTrain === 0) { // Flights
          this.buttonDisabledFlightTrainData = false;
          this.buttonUpdateFlightTrainStr = 'Flights';
        } else { // Both
          this.buttonDisabledAllTrainData = false;
          this.buttonUpdateAllTrainStr = 'Update All';
        }
      }
    );
  }

  updateWeathersHistorical(id) {
    this.adminService.updateHistoricalWeatherData(this.dateStrTrain, id).subscribe(
      (data: any) => {
        if (this.selectButtonTrain === 1) { // Weather
          this.buttonDisabledWeatherTrainData = false;
          this.buttonUpdateWeatherTrainStr = 'Weather';
        } else { // Both
          this.buttonDisabledAllTrainData = false;
          this.buttonUpdateAllTrainStr = 'Update All';
        }
      },
      error => {
        alert(error.error.errors);
        if (this.selectButtonTrain === 1) { // Weather
          this.buttonDisabledWeatherTrainData = false;
          this.buttonUpdateWeatherTrainStr = 'Weather';
        } else { // Both
          this.buttonDisabledAllTrainData = false;
          this.buttonUpdateAllTrainStr = 'Update All';
        }
      }
    );
  }
  // -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -----------------------------Update today data---------------------------------
  updateNowData() {
    if (this.selectButtonNow === 0) { // Flights
      this.buttonDisabledFlightNowData = true;
      this.buttonUpdateFlightNowStr = 'Updating...';
      this.updateFlightsFuture(this.forecastForm.value.airportId);
    } else if (this.selectButtonNow === 1) { // Weather
      this.buttonDisabledWeatherNowData = true;
      this.buttonUpdateWeatherNowStr = 'Updating...';
      this.updateWeathersFuture(this.forecastForm.value.airportId);
    } else { // Both
      this.buttonDisabledAllNowData = true;
      this.buttonUpdateAllNowStr = 'Updating...';
      this.updateFlightsFuture(this.forecastForm.value.airportId);
    }
  }

  updateFlightsFuture(id) {
    this.adminService.updateFutureFlightsData(id).subscribe(
      (data: any) => {
        if (this.selectButtonNow === 0) { // Flights
          this.buttonDisabledFlightNowData = false;
          this.buttonUpdateFlightNowStr = 'Flights';
        } else {
          this.updateWeathersFuture(id);
        }
      },
      error => {
        alert(error.error.errors);
        if (this.selectButtonNow === 0) { // Flights
          this.buttonDisabledFlightNowData = false;
          this.buttonUpdateFlightNowStr = 'Flights';
        } else { // Both
          this.buttonDisabledAllNowData = false;
          this.buttonUpdateAllNowStr = 'Update All';
        }
      }
    );
  }

  updateWeathersFuture(id) {
    this.adminService.updateFutureWeatherData(id).subscribe(
      (data: any) => {
        if (this.selectButtonNow === 1) { // Weather
          this.buttonDisabledWeatherNowData = false;
          this.buttonUpdateWeatherNowStr = 'Weather';
        } else { // Both
          this.buttonDisabledAllNowData = false;
          this.buttonUpdateAllNowStr = 'Update All';
        }
      },
      error => {
        alert(error.error.errors);
        if (this.selectButtonNow === 1) { // Weather
          this.buttonDisabledWeatherNowData = false;
          this.buttonUpdateWeatherNowStr = 'Weather';
        } else { // Both
          this.buttonDisabledAllNowData = false;
          this.buttonUpdateAllNowStr = 'Update All';
        }
      }
    );
  }
  // -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------

  convertDate(str) {
    const date = new Date(str),
      month = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join('-');
  }

  // -----------------------------Update URL data-----------------------------------
  getCountries() {
    this.adminService.getCountries().subscribe(
      (data: Array<Model>) => {
        this.setCountriesValue(data);
      },
      error => {
        alert(error.error.errors);
      }
    );
  }

  setCountriesValue(data: Array<Model>) {
    this.countries = data;
  }

  updateUrlData() {
    this.buttonDisabledUrlData = true;
    this.buttonUpdateUrlStr = 'Updating...';
    this.adminService.updateUrlFlights(this.urlForm.value.countryId).subscribe(
      (data: any) => {
        this.buttonDisabledUrlData = false;
        this.buttonUpdateUrlStr = 'Update';
      },
      error => {
        alert(error.error.errors);
        this.buttonDisabledUrlData = false;
        this.buttonUpdateUrlStr = 'Update';
      }
    );
  }
  // -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -----------------------------Update comment data---------------------------------
  getCities() {
    this.adminService.getCities().subscribe(
      (data: Array<Model>) => {
        this.setCitiesValue(data);
      },
      error => {
        alert(error.error.errors);
      }
    );
  }

  setCitiesValue(data: Array<Model>) {
    this.cities = data;
  }

  updateCommentData() {
    this.adminService.updateComments(this.commentForm.value.cityId).subscribe(
      (data: any) => {},
      error => {
        alert(error.error.errors);
        this.buttonDisabledUrlData = false;
        this.buttonUpdateUrlStr = 'Update';
      }
    );
  }
  // -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------
}
