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
  public baseUrl = 'http://localhost:3001/api/v1';
  fileToUpload: File = null;

  constructor(public _http: HttpClient, public toastr: ToastrService) {}

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
    var header = {};
    header['Authorization'] = localStorage.getItem('token');

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

    return this._http.post(
      this.baseUrl + '/bugs/sort/assignee',
      {
        assignee: assignee,
      },
      { headers: header }
    );
  }

  public getCommentsByBugId(bugid) {
    var header = {};
    header['Authorization'] = localStorage.getItem('token');

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
    var header = {};
    header['Authorization'] = localStorage.getItem('token');

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
      .subscribe((val) => {});
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
    var header = {};
    header['Authorization'] = localStorage.getItem('token');

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

  public storeAttachment(bugId, name) {
    var header = {};
    header['Authorization'] = localStorage.getItem('token');
    header['Content-Type'] = 'application/json';
    return this._http.post(
      this.baseUrl +
        '/upload/attachment?bugId=' +
        bugId +
        '&userId=' +
        localStorage.getItem('userId'),
      JSON.stringify({
        name: name,
      }),
      {
        headers: header,
      }
    );
  }

  public forgotPassword(email) {
    const endpoint = this.baseUrl + '/forgotPassword';
    return this._http.post(endpoint, { email: email });
  }
  public sendEmail(to, subject, text) {
    var req_body = {};
    req_body['to'] = to;
    req_body['subject'] = subject;
    req_body['text'] = text;
    const endpoint = this.baseUrl + '/email';
    return this._http.post(endpoint, req_body);
  }
}
