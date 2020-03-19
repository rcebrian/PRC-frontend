import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { IndexComponent } from './components/index/index.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';

import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';
import { MatButtonModule } from '@angular/material/button';
import { AdministratorComponent} from './components/administrator/administrator.component';

@NgModule({
  declarations: [
    AppComponent,
    AnalysisComponent,
    IndexComponent,
    NavbarComponent,
    FooterComponent,
    DialogBodyComponent,
    AdministratorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    DialogBodyComponent
  ]
})
export class AppModule { }
