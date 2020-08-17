import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from './../../http-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(HttpServiceService: HttpServiceService, public router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedin') == 'true') {
      this.router.navigate(['dashboard']);
    }
  }
}
