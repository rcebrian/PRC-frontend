import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { IndexComponent } from './components/index/index.component';


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
