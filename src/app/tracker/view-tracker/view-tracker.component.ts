import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-tracker',
  templateUrl: './view-tracker.component.html',
  styleUrls: ['./view-tracker.component.css']
})
export class ViewTrackerComponent implements OnInit {

  constructor() { }
  buttonDisabled: Boolean = true;
  changeStatus() { 
    this.buttonDisabled = false;
  }
  ngOnInit(): void {
   
  }

}
