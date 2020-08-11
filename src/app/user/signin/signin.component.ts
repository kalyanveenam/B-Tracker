import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(public HttpService: HttpServiceService, public router: Router) {}
  onSubmit = (value) => {
    console.log('email ' + JSON.stringify(value) + " FN " + value.email);
    this.HttpService.signin(value.email, value.password).subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['dashboard']);
        }
      }
    );
  };
  ngOnInit(): void {}
}
