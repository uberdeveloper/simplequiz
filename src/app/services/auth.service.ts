import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {
	authState: any = null;

  constructor(private afAuth: AngularFireAuth) { 
  }

  login_google(){
  	this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
  	this.afAuth.auth.signOut();
  }
}
