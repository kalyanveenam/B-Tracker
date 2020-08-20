import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
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
  ) {}

  ngOnInit(): void {}
  onSubmit(signupdata) {
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
              response['data']['userDetails']['email'],
              'Welcome to BTracker',
              'Please sign in to continue!'
            );
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
