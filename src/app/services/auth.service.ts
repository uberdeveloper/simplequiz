import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {
  

  constructor(private afAuth: AngularFireAuth) { 
  }

  login_email(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
  }
  
  login_facebook(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
  
  login_google(){
  	this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
  	this.afAuth.auth.signOut();
  }
  
  get authState(){
    return this.afAuth.authState;
  }
  
  get uid(){
    this.afAuth.authState.subscribe(
      (user)=>{
      console.log(user);
      return user.uid;
      }
    )
  }
}
