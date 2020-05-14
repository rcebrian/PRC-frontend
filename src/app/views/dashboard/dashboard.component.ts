import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
    // generate random values for mainChart
    const map = L.map('map').setView([40.471926, -3.56264], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }
}
