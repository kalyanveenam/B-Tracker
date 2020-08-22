import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTrackerComponent } from './create-tracker/create-tracker.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule } from '@angular/forms';
import { ViewTrackerComponent } from './view-tracker/view-tracker.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgxPaginationModule} from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminDashboardComponent,
    CreateTrackerComponent,
    ViewTrackerComponent
  ],
  imports: [Ng2OrderModule, CommonModule,ReactiveFormsModule, SharedModule, AppRoutingModule, FormsModule,NgxSpinnerModule,Ng2SearchPipeModule,NgxPaginationModule],
})
export class TrackerModule {}
