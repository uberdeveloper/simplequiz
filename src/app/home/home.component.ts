import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public auth:AuthService,
    public Q: QuestionService
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
