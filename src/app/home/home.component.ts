import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public auth:AuthService) {
   }

  ngOnInit() {
  }

  signIn(email, password){
  	this.auth.login_email(email, password);
  }

  sayHi(){
  	alert('Hi')
  	console.log('Hi')
  }
  
  get authState(){
    return this.auth.uid;
  }
}
