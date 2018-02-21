import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, 
AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';
import { AuthService } from '../services/auth.service';


@Injectable()
export class QuestionService {

	subject: string;
	docID: string;
	q_data: any;

  constructor(
  	private db: AngularFirestore,
  	private storage: AngularFireStorage,
    public auth: AuthService
    ) {
  	this.add_subject('tnusrb')
   }

   add_subject(subject){
   	this.subject = subject;
   }

  getQuestion(){
  	let r = Math.floor(Math.random()*2147483647)
  	let data = this.db.collection(this.subject,
  		ref => ref.where('random', '>', r).limit(1)).snapshotChanges()
  	data.subscribe(
  		(content) => {
  			this.docID = content[0].payload.doc.id
  			this.q_data = content[0].payload.doc.data();
  		})
  	}


}

interface Question {
	q: string;
	qType: string;
	a: string;
	aType: string;
	choices: string[];
	random: number;
	succ?: number;
	fail?: number;
}
