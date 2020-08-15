import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    public httpService: HttpServiceService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  onSubmit(signupdata) {
    this.httpService
      .signup(
        signupdata.name,
        signupdata.email,
        signupdata.password,
        signupdata.phoneno
      )
      .subscribe(
        (response) => {
          console.log(response)
          if (response['error']==true) {
            this.toastr.error(
              'Missing mandatory fields! Please try again'
            );
          }
          else {
            console.log(response);
            this.toastr.success(
              'Signup Sucessful!',
              'Navigating to signin page'
            );
            this.router.navigate(['signin']);
          }
        },
        (error) => {
          console.log(error);
          this.toastr.error(
            error,
            'Missing mandatory fields! Please try again'
          );
        }
      );

    console.log(signupdata);
  }
}
