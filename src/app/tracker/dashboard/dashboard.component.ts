import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public Http: HttpServiceService, public toastr: ToastrService,public router: Router) {}
  public trackers;
  public isAssignee: boolean = true;
  public isReporter: boolean=false;
  public assignees;
  ngOnInit(): void {
    this.getBugs();
  }
  public getBugs() {
    this.Http.getTrackers().subscribe((response) => {
      console.log(response['data'])
     
      this.trackers = response['data'];

        console.log(this.trackers);
        this.toastr.success(
          'Listing blogs reported by ' +
            localStorage.getItem('username')
        );
      
    });
  }
  sendId(data) {
    console.log(data)

    this.router.navigate(['viewTracker',data]);

   
  }
  getBugsByAssignee() { 
    this.isAssignee = false;
    this.isReporter = true;
    console.log(localStorage.getItem('username'))
    this.Http.getTrackersByAssignee(localStorage.getItem('username')).subscribe((response) => { 
      console.log(response)
      this.trackers = response['data'];

    })
  }
  bugdReportedByUser() { 
    this.isAssignee = true;
    this.isReporter = false;
    this.getBugs();
  }
 

}
