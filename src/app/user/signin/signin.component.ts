import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  notFp: Boolean = true;
  constructor(
    public HttpService: HttpServiceService,
    public router: Router,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  forgotPasswordOnClick = () => {
    this.notFp = false;
  };
  revertFpOnClick = () => {
    this.notFp = true;
  };
  onSubmit = (value) => {
    this.spinner.show();
    if (this.notFp) {
      this.HttpService.signin(value.email, value.password).subscribe(
        (response) => {
          if ((response['status'] = '200')) {
            this.spinner.hide();
            this.toastr.success('Signin sucessfull', 'Taking you to Dashboard');
            this.router.navigate(['dashboard']);
            localStorage.setItem('token', response['data']['token']['token']);
            localStorage.setItem(
              'username',
              response['data']['userDetails']['name']
            );
            localStorage.setItem(
              'email',
              response['data']['userDetails']['email']
            );
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem(
              'userId',
              response['data']['userDetails']['_id']
            );
          }
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error('email or password is incorrect ');
        }
      );
    } else {
      this.HttpService.forgotPassword(value.email).subscribe(
        (response) => {
          if ((response['status'] = '200')) {
            this.spinner.hide();
            this.toastr.success('Password reset sucessfull', 'Login now');
            this.router.navigate(['signin']);
            this.notFp = true;
          }
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error('email is not registered with us');
        }
      );
    }
  };
  ngOnInit(): void {}
}
