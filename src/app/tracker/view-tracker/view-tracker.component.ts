import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../../http-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-view-tracker',
  templateUrl: './view-tracker.component.html',
  styleUrls: ['./view-tracker.component.css'],
})
export class ViewTrackerComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public Http: HttpServiceService,
    public toastr: ToastrService,
    public router: Router,
    public domSanitizer: DomSanitizer,
    private spinner: NgxSpinnerService
  ) {}
  public bugData;
  public watchedIssues;
  buttonDisabled: Boolean = true;
  public bugId;
  fileToUpload: File = null;
  files: FileList;

  public priorities = [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }];
  public statusList = [
    { name: 'open' },
    { name: 'In-progress' },
    { name: 'fixed' },
    { name: 'In-QA' },
    { name: 'closed' },
    { name: 'reject' },
  ];
  public assignees;
  public allComments;
  public imageData = [];
  changeStatus() {
    this.buttonDisabled = false;
  }
  ngOnInit(): void {
    this.viewID();
    this.getAllUsers();
    this.getAttachments();
    this.bugsByUserId()
  }
  public getAllUsers() {
    this.Http.getAllUsers().subscribe((response) => {
      console.log(response);
      this.assignees = response;
    });
  }

  public viewID() {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.Http.getTrackerById(params['id']).subscribe(
        (response) => {
          localStorage.setItem('status', response['data']['status']);
          localStorage.setItem('title', response['data']['title']);
          localStorage.setItem('discription', response['data']['description']);
          localStorage.setItem('priority', response['data']['priority']);
          localStorage.setItem('assignee', response['data']['assignee']);
          localStorage.setItem('currentId', response['data']['_id']);

          this.bugData = response['data'];
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  public updateBug(data) {
    this.spinner.show();
    console.log(data);
    this.Http.updateTracker(localStorage.getItem('currentId'), data).subscribe(
      (response) => {
        this.spinner.hide();
        console.log(response);
        localStorage.setItem('status', response['data']['status']);
        localStorage.setItem('title', response['data']['title']);
        localStorage.setItem('discription', response['data']['description']);
        localStorage.setItem('priority', response['data']['priority']);
        localStorage.setItem('assignee', response['data']['assignee']);
        localStorage.setItem('currentId', response['data']['_id']);
        this.toastr.success('Updated tracker successfully');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.toastr.error(
          'Unable to update your bug!',
          'Plese check your Internet connection and try again'
        );
      }
    );
  }
  public getComments() {
    this.spinner.show();
    this.Http.getCommentsByBugId(localStorage.getItem('currentId')).subscribe(
      (response) => {
        this.spinner.hide();
        console.log(response);
        this.allComments = response['data'];
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error('Unable to get comments!', error);
      }
    );
  }
  public createComment(value) {
    this.spinner.show();
    this.Http.createComment(value.comment).subscribe((response) => {
      this.getComments();
    });
  }
  public getAttachments() {
    setTimeout(() => {
      this.Http.getAttachmentsByBugId(
        localStorage.getItem('currentId')
      ).subscribe((response) => {
        // console.log('hi' +  response['data'][0]['attachments']['data']);
        let count = Object.keys(response['data']).length;
        console.log('ct ::' + count);
        for (let i = 0; i < count; i++) {
          let bufferAttach = response['data'][i]['attachments']['data'];

          let TYPED_ARRAY = new Uint8Array(bufferAttach);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');

          let base64String = btoa(STRING_CHAR);
          //  console.log(base64String);
          let imageurl = this.domSanitizer.bypassSecurityTrustUrl(
            'data:image/jpg;base64,' + base64String
          );
          this.imageData.push(
            imageurl['changingThisBreaksApplicationSecurity']
          );
          console.log('this data:' + JSON.stringify(this.imageData));
        }
      });
    }, 3000);
  }
  public createAttachments(files: FileList) {
    console.log(files);
    this.Http.postMethod(files);
  }
  public bugsByUserId() {
    this.Http.getWatchedUsersByBugId(localStorage.getItem('currentId')).subscribe(
      (response) => {
        this.watchedIssues = response['data'];
        console.log(response['data']);
      }
    );
  }
  public watchIssue() {
    this.Http.addToWatchlist(
      localStorage.getItem('userId'),
      localStorage.getItem('currentId'),
      localStorage.getItem('username'),
      localStorage.getItem('status'),
      localStorage.getItem('title'),
      localStorage.getItem('priority'),
      localStorage.getItem('discription'),
      localStorage.getItem('assignee')
    ).subscribe((response) => {
      this.bugsByUserId();
    });
  }
}
