import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, 
AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';
import shuffle = require('shuffle-array');

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {
	private number_of_questions: number;
	ques = 6;
	success = 0;
	failure = 0;
	review: string[];
	question: string;
	answer: string;
	private actual_answer: string;
	docId: string;
	succ: number;
	fail: number;
	private subject = 'tnusrb';
	choices = new Array();
	img: Observable<string>;
	qType: string;
	initialized = false;
  failures = new Array();


  constructor(
  	private db: AngularFirestore,
  	private storage: AngularFireStorage
  	) { 
  }

  ngOnInit() {
  	  this.getQuestion();
      this.number_of_questions = this.ques;
  }

  set_no_of_questions(q){
    this.number_of_questions = q;
    console.log(this.number_of_questions)
  }

  updateAnswer(){
  	let docu = this.db.doc<Question>(this.subject + '/' + this.docId)
  	if (this.answer == this.actual_answer) {
  		this.success = this.success + 1
  		this.succ = this.succ + 1 
  		docu.update({succ: this.succ})  
  	}
  	else {
  		this.failure = this.failure + 1
  		this.fail = this.fail + 1
      this.failures.push(this.docId)
  		docu.update({fail: this.fail})
  	}
  }

  private set_subject(sub: string) : void {
  	this.subject = sub
  }

  private getQuestion(){
  	this.answer = ''
  	let r = Math.floor(Math.random()*2147483647)
  	let data = this.db.collection(this.subject,
  		ref => ref.where('random', '>', r).limit(1)).snapshotChanges()  	
  	data.subscribe(
  		(content) => {
  			this.docId = content[0].payload.doc.id
  			let loc_data = content[0].payload.doc.data()
  			this.question = loc_data.q
        this.qType = loc_data.qType
  			if (loc_data.qType == 'pic'){
  				this.getURL(this.question)
  			}
  			this.actual_answer = loc_data.a			
  			this.fail = loc_data.fail + 1
  			this.succ = loc_data.succ
  			let choice = loc_data.choices
  			this.choices = shuffle(choice)
  		}
  	)
  }

  nextQuestion(){
  	if ((this.success + this.failure) < this.number_of_questions) {
  		this.updateAnswer()
  		this.getQuestion()
  	}
  	else {
  		this.answer = 'Quiz finished! Thank you'
  	}
  }

  private getURL(url){
  	const ref = this.storage.ref(url)
  	this.img = ref.getDownloadURL()
  }

  get isQuizCompleted() : boolean{
  	if ((this.success + this.failure) < this.number_of_questions) {
  		return true
  	}
  	else {
  		return false
  	}
  }

  get no_of_questions(): number {
  	return this.number_of_questions
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
