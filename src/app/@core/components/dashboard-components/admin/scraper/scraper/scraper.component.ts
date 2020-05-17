import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../../services/admin/admin.service';

@Component({
  selector: 'app-scraper',
  templateUrl: './scraper.component.html',
  styleUrls: ['./scraper.component.css']
})
export class ScraperComponent implements OnInit {
  // Update train data
  yesterday: Date = new Date();
  yesterdayStr: string;
  minDateStr: string;
  dateStrTrain: string;
  airportIdTrain: string;
  errorAirportId: string;
  buttonDisabledAllTrainData: boolean = false;
  buttonUpdateAllTrainStr: string = 'Update all';
  buttonDisabledFlightTrainData: boolean = false;
  buttonUpdateFlightTrainStr: string = 'Flights';
  buttonDisabledWeatherTrainData: boolean = false;
  buttonUpdateWeatherTrainStr: string = 'Weather';
  selectButtonTrain: number;

  // Update today data
  airportIdNow: string;
  errorAirportNow: string;
  buttonDisabledAllNowData: boolean = false;
  buttonUpdateAllNowStr: string = 'Update all';
  buttonDisabledFlightNowData: boolean = false;
  buttonUpdateFlightNowStr: string = 'Flights';
  buttonDisabledWeatherNowData: boolean = false;
  buttonUpdateWeatherNowStr: string = 'Weather';
  selectButtonNow: number;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.yesterdayStr = this.convertDate(this.yesterday);

    this.yesterday.setDate(this.yesterday.getDate() - 4);
    this.minDateStr = this.convertDate(this.yesterday);
  }

  // -----------------------------Update train data---------------------------------
  updateTrainData() {
    if (this.airportIdTrain != null) {
      const airports = this.airportIdTrain.replace(/\s/g, '').split(',');
      this.errorAirportId = null;
      airports.forEach(id => {
        if (this.selectButtonTrain === 0) { // Flights
          this.buttonDisabledFlightTrainData = true;
          this.buttonUpdateFlightTrainStr = 'Updating...';
          this.updateFlightsHistorical(id);
        } else if (this.selectButtonTrain === 1) { // Weather
          this.buttonDisabledWeatherTrainData = true;
          this.buttonUpdateWeatherTrainStr = 'Updating...';
          this.updateWeathersHistorical(id);
        } else { // Both
          this.buttonDisabledAllTrainData = true;
          this.buttonUpdateAllTrainStr = 'Updating...';
          this.updateFlightsHistorical(id);
        }
      });
    } else {
      this.errorAirportId = 'Please, enter an Airport ID';
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
    if (this.airportIdNow != null) {
      const airports = this.airportIdNow.replace(/\s/g, '').split(',');

      airports.forEach(id => {
        console.log(id);
        if (this.selectButtonNow === 0) { // Flights
          this.buttonDisabledFlightNowData = true;
          this.buttonUpdateFlightNowStr = 'Updating...';
          this.updateFlightsFuture(id);
        } else if (this.selectButtonNow === 1) { // Weather
          this.buttonDisabledWeatherNowData = true;
          this.buttonUpdateWeatherNowStr = 'Updating...';
          this.updateWeathersFuture(id);
        } else { // Both
          this.buttonDisabledAllNowData = true;
          this.buttonUpdateAllNowStr = 'Updating...';
          this.updateFlightsFuture(id);
        }
      });
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
}
