import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(
    public HttpService: HttpServiceService,
    public router: Router,
    public toastr: ToastrService
  ) {}
  onSubmit = (value) => {
    this.HttpService.signin(value.email, value.password).subscribe(
      (response) => {
        console.log('test', JSON.stringify(response));
        if ((response['status'] = '200')) {
          this.toastr.success('Signin sucessfull', 'Taking you to Dashboard');
          console.log(response);
          this.router.navigate(['dashboard']);
          localStorage.setItem('token', response['data']['token']['token']);
          localStorage.setItem('username', response['data']['userDetails']['name']);
          localStorage.setItem('isLoggedin', 'true');
        }
      },
      (error) => {
        this.toastr.error('email or password is incorrect ');
      }
    );
  };
  ngOnInit(): void {}
}
