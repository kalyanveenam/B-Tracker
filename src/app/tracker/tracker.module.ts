import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTrackerComponent } from './create-tracker/create-tracker.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { ViewTrackerComponent } from './view-tracker/view-tracker.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { from } from 'rxjs';
@NgModule({
  declarations: [
    DashboardComponent,
    AdminDashboardComponent,
    CreateTrackerComponent,
    ViewTrackerComponent,
  ],
  imports: [CommonModule, SharedModule,AppRoutingModule],
})
export class TrackerModule {}
