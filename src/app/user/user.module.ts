import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [HomeComponent, SigninComponent, SignupComponent
      ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class UserModule { }
