import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { StatisticComponent } from './statistic.component';
import { ChartJSRoutingModule } from './chartjs-routing.module';

@NgModule({
  imports: [
    ChartJSRoutingModule,
    ChartsModule
  ],
  declarations: [ StatisticComponent ]
})
export class ChartJSModule { }
