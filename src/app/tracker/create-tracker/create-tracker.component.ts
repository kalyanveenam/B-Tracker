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
  public priorities = [
    { id: 0, name: 'p1' },
    { id: 1, name: 'p2' },
    { id: 2, name: 'p2' },
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
