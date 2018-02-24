import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email: string;
  password: string;
  error: string;

  constructor(
    public auth:AuthService
    ) {
   }

  ngOnInit() {
  }

  signIn(email, password){
  	this.auth.login_email(email, password);
  }

  signInGoogle(){
    this.auth.login_google();
  }



}
