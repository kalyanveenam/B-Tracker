import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
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
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }
  public addFile(event) {
    var attachment = {};
    this.fileToUpload = event.target.files.item(0);
    attachment['name'] = event.target.files[0].name;
    this.Http.postFile(this.fileToUpload).subscribe((res) => {
      attachment['path'] = 'http://localhost:3001/files/' + attachment['name'];
      this.attachmentFiles.push(attachment);
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
        if (response) {
          this.toastr.success(
            'Bug is created sucessfully',
            'Navigting to your dashboard'
          );
          this.router.navigate(['dashboard']);
        }

        this.Http.storeAttachment(
          response['data']['_id'],
          data.attachment
        ).subscribe((response) => {
          this.Http.sendEmail(
            localStorage.getItem('email'),
            'You have created a tracker',
            'Check it out!'
          );
        });
      },
      (error) => {
        this.toastr.error('Unable to create a bug');
      }
    );
  }
}
