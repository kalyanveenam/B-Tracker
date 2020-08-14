import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../../http-service.service';
@Component({
  selector: 'app-view-tracker',
  templateUrl: './view-tracker.component.html',
  styleUrls: ['./view-tracker.component.css']
})
  
export class ViewTrackerComponent implements OnInit {
   
  constructor(public route: ActivatedRoute,public Http: HttpServiceService) { }
  public bugData;
  buttonDisabled: Boolean = true;
  changeStatus() {
    this.buttonDisabled = false;
  }
  ngOnInit(): void {
    this.viewID();
  }
  public viewID() {
    this.route.params.subscribe(params => {
      console.log(params)
      this.Http.getTrackerById(params['id']).subscribe((response) => { 
        console.log(response['data'])
         this.bugData = response['data'];
      },
        (error) => { 
          console.log(error)
      })
        
      
    })
  
  }
  public updateBug(data) { 
   console.log(data)
    // this.Http.updateTrcker()
    
  
    
  }
}