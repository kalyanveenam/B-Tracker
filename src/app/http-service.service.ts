import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  public baseUrl = 'https://btracker-backend.herokuapp.com/api/v1';
  fileToUpload: File = null;

  constructor(public _http: HttpClient, public toastr: ToastrService) {
    console.log('HTTP service constructor is called');
  }

  public signin(username, password) {
    return this._http.post(
      this.baseUrl + '/user/login',
  { email: username, password: password },
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
  public getAttachmentsByBugId(bugid) {
    console.log(localStorage.getItem('token'));
    var header = {};
    header['Authorization'] = localStorage.getItem('token');
    console.log(this.baseUrl + '/get/attachments?id=' + bugid);
    return this._http.get(this.baseUrl + '/get/attachments?id=' + bugid, {
      headers: header,
    });
  }
  public postMethod(files: FileList) {
    this.fileToUpload = files.item(0);
    let formData = new FormData();
    formData.append('attachments', this.fileToUpload, this.fileToUpload.name);

    this._http
      .post(
        this.baseUrl +
          '/create/attachment?bugId=' +
          localStorage.getItem('currentId'),
        formData
      )
      .subscribe((val) => {
        console.log(val);
      });
  }
  public addToWatchlist(
    userid,
    bugid,
    username,
    status,
    title,
    priority,
    description,
    assignee
  ) {
    console.log(localStorage.getItem('token'));
    var header = {};
    header['Authorization'] = localStorage.getItem('token');
    console.log(this.baseUrl + '/add/watcher?id=' + bugid);
    return this._http.post(
      this.baseUrl + '/add/watcher?userId=' + userid + '&bugId=' + bugid,
      {
        username: username,
        title: title,
        priority: priority,
        status: status,
        description: description,
        assignee: assignee,
      },
      {
        headers: header,
      }
    );
  }
  public getWatchedBugsByUserId(userId) {
    var header = {};
    header['Authorization'] = localStorage.getItem('token');
    header['Content-Type'] = 'application/json';
    console.log(this.baseUrl + '/get/bugsByUserId?id=' + userId);
    return this._http.get(
      this.baseUrl + '/get/bugsByUserId?id=' + userId,

      {
        headers: header,
      }
    );
  }
  public getWatchedUsersByBugId(bugid) {
    var header = {};
    header['Authorization'] = localStorage.getItem('token');
    header['Content-Type'] = 'application/json';
    return this._http.get(
      this.baseUrl + '/get/usersBybugId?id=' + bugid,

      {
        headers: header,
      }
    );
  }
  public logout() {
    var header = {};
    header['Authorization'] = localStorage.getItem('token');
    header['Content-Type'] = 'application/json';
    return this._http.post(
      this.baseUrl + '/user/logout',
      {},
      {
        headers: header,
      }
    );
  }
  public postFile(fileToUpload: File) {
    const endpoint = this.baseUrl + '/uploadAttachment';
    const formData: FormData = new FormData();
    formData.append('attachment', fileToUpload, fileToUpload.name);
    return this._http.post(endpoint, formData);
  }
}
