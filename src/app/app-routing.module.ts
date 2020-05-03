import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { IndexComponent } from './components/index/index.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { FlightsComponent } from './components/flights/flights.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';

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
  },
  // login
  {
    path: 'login',
    component: LoginComponent
  },
  // register
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
