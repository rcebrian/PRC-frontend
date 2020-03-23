import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { IndexComponent } from './components/index/index.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { FlightsComponent } from './components/flights/flights.component';

const routes: Routes = [
  // home
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  // flights
  {
    path: 'flights',
    component: FlightsComponent,
  },
  // admin
  {
    path: 'administrator',
    component: AdministratorComponent
  },
  // analysis
  {
    path: 'analysis',
    component: AnalysisComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
