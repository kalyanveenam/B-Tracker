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
import { NgxSpinnerService } from "ngx-spinner";
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
  buttonDisabled: Boolean = true;
  public bugId;
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
      console.log(response);
      this.assignees = response;
    });
  }


  public viewID() {
    
    this.route.params.subscribe((params) => {
      console.log(params);
      this.Http.getTrackerById(params['id']).subscribe(
        (response) => {
       
          localStorage.setItem('currentId', response['data']['_id']);
          console.log(response['data']);
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
      (result) => {
        this.spinner.hide();
        console.log(result);
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
    console.log('hieee '+localStorage.getItem('currentId') + " sff");
    this.Http.getAttachmentsByBugId(
      localStorage.getItem('currentId')
    ).subscribe((response) => {
      console.log('hi' + JSON.stringify(response));
   
        let bufferAttach = response['data'][0]['attachments']['data'];

        let TYPED_ARRAY = new Uint8Array(bufferAttach);
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, '');
  
        let base64String = btoa(STRING_CHAR);
        //  console.log(base64String);
        let imageurl = this.domSanitizer.bypassSecurityTrustUrl(
          'data:image/jpg;base64,' + base64String
      );
      console.log('bd is ' + imageurl);
    });
  }
}
