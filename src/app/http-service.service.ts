import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  public baseUrl = 'https://btracker-backend.herokuapp.com/api/v1';
  constructor(public _http: HttpClient, public toastr: ToastrService) {
    console.log('HTTP service constructor is called');
  }

  public signin(username, password) {
    return this._http
      .post(
        this.baseUrl + '/user/login',
        JSON.stringify({ email: username, password: password }),
        { headers: { 'Content-Type': 'application/json' } }
      )
     
  }
  public signup(name, email, password, phoneno) {
    return this._http.post(
      this.baseUrl + '/user/signup',
      JSON.stringify({
        name: name,
        email: email,
        password: password,
        phoneNo: phoneno,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
 
}
