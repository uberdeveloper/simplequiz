import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routing } from './app.routes';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { QuestionService } from './services/question.service';
import { HomeComponent } from './home/home.component';
import { AdsenseModule } from 'ng2-adsense';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId:'Quiz'}),
    FormsModule,
    RouterModule,
    routing,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AdsenseModule.forRoot({
      adClient: "ca-pub-0361804798945452",
      adSlot: "1476777941"
    })
  ],
  providers: [
    AuthService,
    QuestionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
      @Inject(PLATFORM_ID) private platformId: Object,
      @Inject(APP_ID) private appId: string) {
      const platform = isPlatformBrowser(platformId) ?
        'in the browser' : 'on the server';
      console.log(`Running ${platform} with appId=${appId}`);
    }
}
