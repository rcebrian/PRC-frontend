import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Import Containers
import { DefaultLayoutComponent } from './containers';

import { E404Component } from './@core/components/errors/e404.component';
import { E500Component } from './@core/components/errors/e500.component';
import { LoginComponent } from './@core/components/auth/login/login.component';
import { RegisterComponent } from './@core/components/auth/register/register.component';
import { DashboardComponent } from './@core/components/dashboard-components/dashboard/dashboard.component';
import {ContactComponent} from './@core/components/dashboard-components/contact/contact.component';
import {ScraperComponent} from './@core/components/dashboard-components/admin/scraper/scraper/scraper.component';
import { ModelComponent } from './@core/components/dashboard-components/admin/model/model/model.component';
import { StatisticComponent } from './@core/components/dashboard-components/admin/statistic/statistic/statistic.component';
import {AirportComponent} from './@core/components/dashboard-components/airport/airport.component';
import {AdminGuard} from "./@core/guards/admin.guard";
import {AirportDescriptionComponent} from './@core/components/dashboard-components/airport-description/airport-description.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent, data: { title: 'Login Page' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register Page' } },
  { path: '404', component: E404Component, data: { title: 'Page 404' } },
  { path: '500', component: E500Component, data: { title: 'Page 500' } },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'admin/scrapers',
        component: ScraperComponent,
        canActivate: [AdminGuard]

      },
      {
        path: 'admin/models',
        component: ModelComponent,
        canActivate: [AdminGuard]

      },
      {
        path: 'admin/statistics',
        component: StatisticComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'airports',
        component: AirportComponent
      },
      {
        path: 'airports/description',
        component: AirportDescriptionComponent
      },
    ]
  },
  { path: '**', component: E404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
