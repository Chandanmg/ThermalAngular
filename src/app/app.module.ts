import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { SensorsPageComponent } from './screens/dashboard/sensors-page/sensors-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatIconModule, MatPaginatorModule, MatSidenavModule, MatTableModule, MatSnackBarModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SensorCardComponent } from './screens/dashboard/sensors-page/sensor-card/sensor-card.component';
import { DashboardMeasurementComponent } from './screens/dashboard-measurement/dashboard-measurement.component';
import { LeftDataComponent } from './screens/dashboard-measurement/left-data/left-data.component';
import { RightDataComponent } from './screens/dashboard-measurement/right-data/right-data.component';
import { SnackbarService } from './screens/snackbar';
import { HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from './screens/settings/settings.component';
import { AddDailogComponent } from './screens/settings/add-dailog/add-dailog.component';
import { SettingsContentComponent } from './screens/settings/settings-content/settings-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddLocationComponent } from './screens/settings/add-location/add-location.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SensorsPageComponent,
    SensorCardComponent,
    DashboardMeasurementComponent,
    LeftDataComponent,
    RightDataComponent,
    SettingsComponent,
    AddDailogComponent,
    SettingsContentComponent,
    AddLocationComponent,
  ],
  entryComponents: [AddDailogComponent, AddLocationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatIconModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
