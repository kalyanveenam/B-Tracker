import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    public httpService: HttpServiceService,
    public router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  get primEmail() {
    return this.userEmails.get('email')
  }
  get textControl() {
    return this.userEmails.get('name')
  }
  get phoneNumberControl() {
    return this.userEmails.get('phoneno');
  }
  get passwordValidator() {
    return this.userEmails.get('password');
  }
  userEmails = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    name: new FormControl('', [
      Validators.required]),
    phoneno: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+){1}91){1}[1-9]{1}[0-9]{9}$')]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*\\d).{8,}$')
    ])
  });
  ngOnInit(): void { }
  onSubmit() {


    var signupdata = this.userEmails.value;

    this.spinner.show();
    this.httpService
      .signup(
        signupdata.name,
        signupdata.email,
        signupdata.password,
        signupdata.phoneno
      )
      .subscribe(
        (response) => {
          this.spinner.hide();

          if (response['error'] == true) {
            this.toastr.error('Missing mandatory fields! Please try again');
          } else {
            this.httpService.sendEmail(
              response['data']['email'],
              'Welcome to BTracker',
              'Please sign in to continue!'
            ).subscribe((res) => {
            })
            this.toastr.success('Signup Sucessful!');
            this.router.navigate(['signin']);
          }
        },
        (error) => {
          this.spinner.hide();

          this.toastr.error(
            error,
            'Missing mandatory fields! Please try again'
          );
        }
      );
  }
}

