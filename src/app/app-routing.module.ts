import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardMeasurementComponent } from './screens/dashboard-measurement/dashboard-measurement.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { SettingsComponent } from './screens/settings/settings.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'measurement', component: DashboardMeasurementComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
