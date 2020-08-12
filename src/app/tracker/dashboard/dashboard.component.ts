import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public Http: HttpServiceService, public toastr: ToastrService) {}
  public trackers;
  ngOnInit(): void {
    this.getBugs();
  }
  public getBugs() {
    this.Http.getTrackers().subscribe((response) => {
      if ((response['status'] = '200')) {
        
        this.trackers = response;
        console.log(this.trackers);
        this.toastr.success(
          'Listing blogs reported by' +
            localStorage.getItem('userDetails')['name']
        );
      }
    });
  }
}
