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

  public getTrackers() {
    console.log(localStorage.getItem('token'));
    var header = {};
    header['Authorization'] = localStorage.getItem('token');
    return this._http.get(this.baseUrl + '/bugs', { headers: header });
  }
  public createTracker(title, description, priority, assignee) {
    var header = {};
    header['Authorization'] = localStorage.getItem('token');
    header['Content-Type'] = 'application/json';
    return this._http.post(
      this.baseUrl + '/create/bug',
      {
        title: title,
        description: description,
        priority: priority,
        Attachment: 'support soon',
        assignee: assignee,
        reporter: localStorage.getItem('username'),
      },
      { headers: header }
    );
  }

  public getTrackerById(id) {
    console.log(localStorage.getItem('token'));
    var header = {};
    header['Authorization'] = localStorage.getItem('token');
    console.log(this.baseUrl + '/bugs/' + id);
    return this._http.get(this.baseUrl + '/bugs/' + id, { headers: header });
  }
  public updateTracker(id, data) {
    var header = {};
    header['Authorization'] = localStorage.getItem('token');
    header['Content-Type'] = 'application/json';
    return this._http.post(this.baseUrl + '/bugs/update/' + id, data, {
      headers: header,
    });
  }
  public getAllUsers() {
    var header = {};
    header['Authorization'] = localStorage.getItem('token');

    return this._http.get(this.baseUrl + '/users/all/', { headers: header });
  }
  public getTrackersByAssignee(assignee) {
    var header = {};
    header['Authorization'] = localStorage.getItem('token');
    console.log(this.baseUrl + '/bugs/sort/assignee');
    return this._http.post(
      this.baseUrl + '/bugs/sort/assignee',
      {
        assignee: assignee,
      },
      { headers: header }
    );
  }

  public getCommentsByBugId(bugid) {
    console.log(localStorage.getItem('token'));
    var header = {};
    header['Authorization'] = localStorage.getItem('token');
    console.log(this.baseUrl + '/bugs/comments/all?id=' + bugid);
    return this._http.get(this.baseUrl + '/bugs/comments/all?id=' + bugid, {
      headers: header,
    });
  }
  public createComment(comments) {
    var header = {};
    header['Authorization'] = localStorage.getItem('token');
    header['Content-Type'] = 'application/json';
    return this._http.post(
      this.baseUrl + '/bugs/comments',
      {
        username: localStorage.getItem('username'),
        comment: comments,
        bugId: localStorage.getItem('currentId'),
      },
      { headers: header }
    );
  }
  let 
}
