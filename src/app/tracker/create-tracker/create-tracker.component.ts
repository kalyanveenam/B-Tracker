import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-create-tracker',
  templateUrl: './create-tracker.component.html',
  styleUrls: ['./create-tracker.component.css'],
})
export class CreateTrackerComponent implements OnInit {
  public attachmentFiles = [];
  fileToUpload: File = null;
  public priorities = [
    { id: 0, name: 'p1' },
    { id: 1, name: 'p2' },
    { id: 2, name: 'p3' },
  ];
  public assignees;
  constructor(
    public Http: HttpServiceService,
    public toastr: ToastrService,
    public router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }
  public addFile(event) {
    this.spinner.show();
    var attachment = {};
    this.fileToUpload = event.target.files.item(0);
    attachment['name'] = event.target.files[0].name;
    this.Http.postFile(this.fileToUpload).subscribe((res) => {
      attachment['path'] = 'https://dashboard.heroku.com/apps/btracker-backend' + attachment['name'];
      this.attachmentFiles.push(attachment);
      this.spinner.hide();
    }),
      (err) => {};
  }
  public getAllUsers() {
    this.Http.getAllUsers().subscribe((response) => {
      this.assignees = response;
    });
  }

  public onSubmit(data) {
    this.Http.createTracker(
      data.title,
      data.description,
      data.priority,
      data.assignee
    ).subscribe(
      (response) => {
        if (response['error'] == false) {

        
          this.toastr.success(
            'Bug is created sucessfully',
            'Navigting to your dashboard'
          );
          this.router.navigate(['dashboard']);
        }
        else { 
          this.toastr.error(
            'Please enter all mandatory fields'
          );
        }

        this.Http.storeAttachment(
          response['data']['_id'],
          data.attachment
        ).subscribe((response) => {
       
         this.Http.sendEmail(
              response['data']['email'],
              'You have created a tracker',
              'Please open Btracker tool for more details'
            ).subscribe((res)=>{
            })
        },
        (error) => {
          this.toastr.error('Unable to create a bug');
        }
        );
      },
     
    );
  }
}
