import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatetrackerComponent } from './createtracker/createtracker.component';
import { ViewtrackerComponent } from './viewtracker/viewtracker.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreateTrackerComponent } from './create-tracker/create-tracker.component';
import { ViewTrckerComponent } from './view-trcker/view-trcker.component';
import { ViewTrackerComponent } from './view-tracker/view-tracker.component';



@NgModule({
  declarations: [DashboardComponent, CreatetrackerComponent, ViewtrackerComponent, AdminDashboardComponent, CreateTrackerComponent, ViewTrckerComponent, ViewTrackerComponent],
  imports: [
    CommonModule
  ]
})
export class TrackerModule { }
