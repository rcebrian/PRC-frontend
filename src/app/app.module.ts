import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgSelectModule } from '@ng-select/ng-select';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { LoginComponent } from './@core/components/auth/login/login.component';
import { RegisterComponent } from './@core/components/auth/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './@core/components/dashboard-components/dashboard/dashboard.component';
import { ScraperComponent } from './@core/components/dashboard-components/admin/scraper/scraper/scraper.component';
import { ModelComponent } from './@core/components/dashboard-components/admin/model/model/model.component';
import { MapComponent } from './@core/components/dashboard-components/map/map.component';
import { RecommendationsComponent } from './@core/components/dashboard-components/recommendations/recommendations.component';
import { E404Component } from './@core/components/errors/e404.component';
import { E500Component } from './@core/components/errors/e500.component';
import {ContactComponent} from './@core/components/dashboard-components/contact/contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AvatarModule} from 'ngx-avatar';
import { StatisticComponent } from './@core/components/dashboard-components/admin/statistic/statistic/statistic.component';
import {providerDef} from '@angular/compiler/src/view_compiler/provider_compiler';
import {AuthInterceptorService} from './@core/services/auth/auth-interceptor.service';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AirportDescriptionComponent } from './@core/components/dashboard-components/airport-description/airport-description.component';
import { LoadingSpinnerComponent } from './@core/components/loading-spinner/loading-spinner.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    AvatarModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CollapseModule,
    NgbModule,
    NgxPaginationModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    MapComponent,
    RecommendationsComponent,
    E404Component,
    E500Component,
    ContactComponent,
    ScraperComponent,
    ModelComponent,
    StatisticComponent,
    AirportDescriptionComponent,
    LoadingSpinnerComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
