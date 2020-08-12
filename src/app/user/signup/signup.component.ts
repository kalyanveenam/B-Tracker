import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public httpService:HttpServiceService, public router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(signupdata) { 
    this.httpService.signup(signupdata.name, signupdata.email, signupdata.password, signupdata.phoneno).subscribe((response) => { 
      if (response) { 
        console.log(response)
this.router.navigate(['signin'])
      }
    })
      
    


console.log(signupdata)
  }
}
