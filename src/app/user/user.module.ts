import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [HomeComponent, SigninComponent, SignupComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
