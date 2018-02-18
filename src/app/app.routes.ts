import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{path: '', redirectTo: '', pathMatch: 'full'},
	{path: 'home', component: HomeComponent},
    {path: 'quiz', component: QuizComponent}
];

export const routing = RouterModule.forRoot(routes);