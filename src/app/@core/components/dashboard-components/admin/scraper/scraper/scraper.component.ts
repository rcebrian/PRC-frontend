import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../../services/admin/admin.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NameId} from '../../../../../models/name-id';

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
  selectButtonTrain: number;

  // Update today data
  selectButtonNow: number;

  airports: Array<NameId>;
  countries: Array<NameId>;
  cities: Array<NameId>;

  // Update url data
  countryId: string;

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
      (data: Array<NameId>) => {
        this.setAirportValue(data);
      },
      error => {
        alert(error.error.errors);
      }
    );
  }

  setAirportValue(data: Array<NameId>) {
    this.airports = data;
  }

  updateTrainData() {
    if (this.selectButtonTrain === 0) { // Flights
      this.updateFlightsHistorical(this.historyForm.value.airportId);
    } else if (this.selectButtonTrain === 1) { // Weather
      this.updateWeathersHistorical(this.historyForm.value.airportId);
    } else { // Both
      this.updateFlightsHistorical(this.historyForm.value.airportId);
    }
  }

  updateFlightsHistorical(id) {
    this.adminService.updateHistoricalFlightsData(this.dateStrTrain, id).subscribe(
      (data: any) => {
        if (this.selectButtonTrain !== 0) {
          this.updateWeathersHistorical(id);
        }
      },
      error => {alert(error.error.errors); }
    );
  }

  updateWeathersHistorical(id) {
    this.adminService.updateHistoricalWeatherData(this.dateStrTrain, id).subscribe(
      (data: any) => {},
      error => {alert(error.error.errors); }
    );
  }
  // -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -----------------------------Update today data---------------------------------
  updateNowData() {
    if (this.selectButtonNow === 0) { // Flights
      this.updateFlightsFuture(this.forecastForm.value.airportId);
    } else if (this.selectButtonNow === 1) { // Weather
      this.updateWeathersFuture(this.forecastForm.value.airportId);
    } else { // Both
      this.updateFlightsFuture(this.forecastForm.value.airportId);
    }
  }

  updateFlightsFuture(id) {
    this.adminService.updateFutureFlightsData(id).subscribe(
      (data: any) => {
        if (this.selectButtonNow !== 0) { // Flights
          this.updateWeathersFuture(id);
        }
      },
      error => {
        alert(error.error.errors);
        if (this.selectButtonNow === 0) { // Flights
        } else { // Both
        }
      }
    );
  }

  updateWeathersFuture(id) {
    this.adminService.updateFutureWeatherData(id).subscribe(
      (data: any) => {},
      error => {
        alert(error.error.errors);
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
      (data: Array<NameId>) => {
        this.setCountriesValue(data);
      },
      error => {
        alert(error.error.errors);
      }
    );
  }

  setCountriesValue(data: Array<NameId>) {
    this.countries = data;
  }

  updateUrlData() {
    this.adminService.updateUrlFlights(this.urlForm.value.countryId).subscribe(
      (data: any) => {
      },
      error => {
        alert(error.error.errors);
      }
    );
  }
  // -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------

  // -----------------------------Update comment data---------------------------------
  getCities() {
    this.adminService.getCities().subscribe(
      (data: Array<NameId>) => {
        this.setCitiesValue(data);
      },
      error => {
        alert(error.error.errors);
      }
    );
  }

  setCitiesValue(data: Array<NameId>) {
    this.cities = data;
  }

  updateCommentData() {
    this.adminService.updateComments(this.commentForm.value.cityId).subscribe(
      (data: any) => {},
      error => {
        alert(error.error.errors);
      }
    );
  }
  // -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------
}
