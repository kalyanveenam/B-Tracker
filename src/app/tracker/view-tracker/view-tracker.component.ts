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
  ) {

    this.bugsByUserId();

  }
  public bugData;
  public fileName;
  public watchedIssues;
  buttonDisabled: Boolean = true;
  public bugId;
  fileToUpload: File = null;
  files: FileList;
  public attachmentFiles = [];
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
  public attachments = [];
  isWatched:boolean= false;
  changeStatus() {
    this.buttonDisabled = false;
  }
  ngOnInit(): void {
    this.viewID();
    this.getAllUsers();
    this.getAttachments();
  }
  public getAllUsers() {
    this.Http.getAllUsers().subscribe((response) => {
     
      this.assignees = response;
    });
  }

  public viewID() {
    this.route.params.subscribe((params) => {
     
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
         
        }
      );
    });
  }

  public updateBug(data) {
    this.spinner.show();
  
    this.Http.updateTracker(localStorage.getItem('currentId'), data).subscribe(
      (response) => {
        this.spinner.hide();
      
        localStorage.setItem('status', response['data']['status']);
        localStorage.setItem('title', response['data']['title']);
        localStorage.setItem('discription', response['data']['description']);
        localStorage.setItem('priority', response['data']['priority']);
        localStorage.setItem('assignee', response['data']['assignee']);
        localStorage.setItem('currentId', response['data']['_id']);
        this.toastr.success('Updated tracker successfully');
        this.router.navigate(['/dashboard']);
     
        this.Http.storeAttachment(
          response['data']['_id'],
          data.attachment
        ).subscribe((response) => {});
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
        this.fileName = response['data'];
        for (var i in response['data']) {
          var attachment = {};
          var name = response['data'][i]['attachment'].toString();

          attachment['name'] = name.split('\\').pop();
          attachment['path'] =
            'https://btracker-backend.herokuapp.com/files/' +
            attachment['name'];
          this.attachments.push(attachment);
        }
      });
    }, 3000);
  }
  public addFile(event) {
    var attachment = {};
    this.fileToUpload = event.target.files.item(0);
    attachment['name'] = event.target.files[0].name;
    this.Http.postFile(this.fileToUpload).subscribe((res) => {
      
      attachment['path'] =
        'https://btracker-backend.herokuapp.com/files/' + attachment['name'];
      this.attachmentFiles.push(attachment);
     
    }),
      (err) => {
     
      };
  }
  public createAttachments(files: FileList) {
   
    this.Http.postMethod(files);
  }
  public bugsByUserId() {
    this.Http.getWatchedBugsByUserId(localStorage.getItem('userId')).subscribe(
      (response) => {
        this.watchedIssues = response['data'];
         for (var i in response['data']) {
             if (localStorage.getItem('title') == response['data'][i]['title']) {
            this.isWatched = true;
             break;
          }
        }
      }
    );

  }
  public watchIssue() {
    this.isWatched = true;
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
