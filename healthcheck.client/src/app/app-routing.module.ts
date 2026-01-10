import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HealthCheckComponent } from './health-check/health-check.component';
const routes: Routes = [
  {path: '', component:HomeComponent, pathMatch: 'full'},
  { path: 'health-check', component: HealthCheckComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
