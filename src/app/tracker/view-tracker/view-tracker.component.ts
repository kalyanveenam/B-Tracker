import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../../http-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
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
    public router: Router
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
  

  changeStatus() {
    this.buttonDisabled = false;
  }
  ngOnInit(): void {
    this.viewID();
    this.getAllUsers();
  }
  public getAllUsers() { 
    this.Http.getAllUsers().subscribe((response) => { 
      console.log(response)
      this.assignees = response;

    })
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
    console.log(data);
    this.Http.updateTracker(localStorage.getItem('currentId'), data).subscribe(
      (result) => {
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
}
