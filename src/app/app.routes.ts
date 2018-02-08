import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
    {path: 'home', component: AppComponent},
    {path: 'quiz', component: QuizComponent}
];

export const routing = RouterModule.forRoot(routes);