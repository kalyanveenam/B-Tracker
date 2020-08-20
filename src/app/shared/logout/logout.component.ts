import { Component, OnInit, Input } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  name: string;

  @Input() isMobile;
  isLoggedIn: boolean;
  constructor(private httpConnect: HttpServiceService, private router: Router) {
    this.isLoggedIn = localStorage.getItem('isLoggedin') == 'true';
    this.name = localStorage.getItem('username');
    this.isMobile = this.isMobile == 'true';
   
  }
  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedin') == 'true';
    this.name = localStorage.getItem('username');
    this.isMobile = this.isMobile == 'true';
    
  }

  logout() {
    this.httpConnect.logout().subscribe((response) => {
      if (response) {
 
        localStorage.clear();
        this.router.navigate(['/home']);
        this.isLoggedIn = false;
      }
    });
  }
}
