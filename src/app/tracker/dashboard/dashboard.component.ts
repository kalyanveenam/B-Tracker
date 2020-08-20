import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
export interface Person {
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  reporter: string;
  createdDate: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public Http: HttpServiceService,
    public toastr: ToastrService,
    public router: Router,
    private spinner: NgxSpinnerService
  ) {}
  public trackers;
  public headers = [];
  public rows = [];

  public isAssignee: boolean = true;
  public isReporter: boolean = false;
  public assignees;
  public term;
  public watchedIssues;
  p: number = 1;
  public btnstyle;
  isReportedClicked: boolean = true;
  isAssigneeClicked: boolean = false;
  isWatchedClicked: boolean = false;
  isCreateClicked: boolean = false;
  ngOnInit(): void {
   this.bugdReportedByUser()
    this.btnstyle = 'btn-default';
  }
  changestyle() {
    this.btnstyle = 'btn-change';

  }
  public getBugs() {
    this.spinner.show();
    this.Http.getTrackers().subscribe((response) => {
    
      this.trackers = response['data'];
      this.spinner.hide();
    });
  }
  sendId(data) {
    localStorage.setItem('currentId', data._id);
    this.router.navigate(['viewTracker', data]);
  }
  getBugsByAssignee() {
    this.isAssignee = false;
    this.isReporter = true;
    this.isAssigneeClicked = true;
    this.isCreateClicked = false;
    this.isWatchedClicked = false;
    this.isReportedClicked = false;

    this.spinner.show();

    this.Http.getTrackersByAssignee(localStorage.getItem('username')).subscribe(
      (response) => {
        this.spinner.hide();
        console.log(response);
        this.trackers = response['data'];
      }
    );
  }
  getAttaachmentsById() {
    console.log(localStorage.getItem('currentId'));
    this.Http.getAttachmentsByBugId(
      localStorage.getItem('currentId')
    ).subscribe((response) => {
      console.log(response);
      // this.trackers = response['data'];
    });
  }
  bugdReportedByUser() {
   
    this.isAssignee = true;
    this.isReporter = false;
    this.isReportedClicked = true;
    this.isAssigneeClicked = false;
    this.isCreateClicked = false;
    this.isWatchedClicked = false;
    this.getBugs();
  }
  public bugsByUserId() {
    this.isWatchedClicked = true;
    this.isReportedClicked = false;
    this.isAssigneeClicked = false;
    this.isCreateClicked = false;
    this.Http.getWatchedBugsByUserId(localStorage.getItem('userId')).subscribe(
      (response) => {
        console.log(response['data'])
        this.trackers = response['data'];
       
      }
    );
  }
}
