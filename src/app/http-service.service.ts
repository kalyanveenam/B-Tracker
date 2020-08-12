import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  public baseUrl = 'https://btracker-backend.herokuapp.com/api/v1';
  constructor(public _http: HttpClient) {
    console.log('HTTP service constructor is called');
  }
  public signin(username, password) {
    return this._http.post(
      this.baseUrl + '/user/login',
      JSON.stringify({ email: username, password: password }),
      { headers: { 'Content-Type': 'application/json' } }
    );
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
