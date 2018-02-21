import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {
	authState: any;
	error = '';

  constructor(public afAuth: AngularFireAuth) {
  	afAuth.authState.subscribe(
  		(user) => {
  			this.authState=user;
  		}
  	)
  }

  login_email(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    	.then(user => {
    		console.log('SUCCESS')
    		this.authState=user;
    	})
    	.catch(err => {
    		alert(err.message)
    		console.log('ERROR IS')
    		this.error = err
    	});
  }
  
  login_google(){
  	this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
  	this.afAuth.auth.signOut();
  }

  get uid() {
  	if (this.authState != null){
  		return this.authState.uid;
  	}

  }

  get email(){
  	return this.authState.email;
  }
  
}
