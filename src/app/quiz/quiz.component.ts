import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, 
AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';


function shuffle(list: string[]): string[] {
	let options = [
		[0, 1, 2, 3],
		[3, 1 ,2, 0],
		[2, 0, 1, 3],
		[1, 2, 3, 0],
		[1, 0, 2, 3],
		[0, 3, 2, 1]
	]
	let r = options[Math.floor(Math.random()*options.length)]
	let arr = new Array()
	for (let i = 0; i < 4; i++) {
		arr.push(list[r[i]])
	}
	return arr
}


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
	isPic = false;
	initialized = false;


  constructor(
  	private db: AngularFirestore,
  	private storage: AngularFireStorage
  	) { 
  }

  ngOnInit() {
  	this.getQuestion()
  }

  set_no_of_questions(q) {
  	if (!this.initialized) {
  		console.log('Hi')
  		this.number_of_questions = q
  		this.initialized = true
  	}
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
  		docu.update({fail: this.fail})
  	}
  }

  private set_subject(sub: string) : void {
  	this.subject = sub
  }

  private getQuestion(){
  	this.isPic = false
  	this.answer = ''
  	let r = Math.floor(Math.random()*2147483647)
  	let data = this.db.collection(this.subject,
  		ref => ref.where('random', '>', r).limit(1)).snapshotChanges()  	
  	data.subscribe(
  		(content) => {
  			this.docId = content[0].payload.doc.id
  			let loc_data = content[0].payload.doc.data()
  			this.question = loc_data.q
  			if (loc_data.qType == 'pic'){
  				this.isPic = true
  				this.getURL(this.question)
  			}
  			this.actual_answer = loc_data.a			
  			this.fail = loc_data.fail + 1
  			this.succ = loc_data.succ
  			let choice = loc_data.choices
  			choice.push(loc_data.a)
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
