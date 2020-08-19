import { Component, OnInit } from '@angular/core';
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
  isUploaded: Boolean;
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
    this.isUploaded = false;
    this.getAllUsers();
  
  }
  public addFile(event) {
    var attachment =  {};
    this.fileToUpload = event.target.files.item(0);
    console.log('yaay' + event.target.files[0].name);
    attachment['name'] = event.target.files[0].name;
    this.Http.postFile(this.fileToUpload).subscribe((res) => {
      console.log('res is ' + res);
      this.isUploaded = true;
      attachment['path'] = "http://localhost:3001/files/"+attachment['name'];
      this.attachmentFiles.push(attachment);
    }), (err) => { console.log('err ' + err) };
  };
  public getAllUsers() { 
    this.Http.getAllUsers().subscribe((response) => { 
      console.log(response)
      this.assignees = response;

    })
  }

  public onSubmit(data) {
    this.Http.createTracker(
      data.title,
      data.description,
      data.priority,
      data.assignee,
    
    ).subscribe(
      (response) => {
        console.log(response)
        if (response) {
          this.toastr.success(
            'Bug is created sucessfully',
            'Navigting to your dashboard'
          );
          this.router.navigate(['dashboard']);
        }
      },
      (error) => {
        console.log(error);
        this.toastr.error('Unable to create a bug');
      }
    );
    console.log(data);
  }
}
