import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/user/home/home.component';
import { SigninComponent } from '../app/user/signin/signin.component';
import { SignupComponent } from '../app/user/signup/signup.component';
import { AdminDashboardComponent } from '../app/tracker/admin-dashboard/admin-dashboard.component';
import { CreateTrackerComponent } from '../app/tracker/create-tracker/create-tracker.component';
import { ViewTrackerComponent } from '../app/tracker/view-tracker/view-tracker.component';
import { DashboardComponent } from '../app/tracker/dashboard/dashboard.component';

import { from } from 'rxjs';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'createTracker', component: CreateTrackerComponent },
  { path: 'adminDashboard', component: AdminDashboardComponent },
  { path: '', component: HomeComponent },
  {path: 'viewTracker/:id', component: ViewTrackerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
