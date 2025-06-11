import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { LessonDetailsComponent } from './lesson-details/lesson-details.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', component: SignInComponent },
    { path: 'lessons-list', component: LessonsListComponent },
    { path: 'registration', component: RegistrationComponent, canActivate: [authGuard] },
    // { path: 'lesson-details', component: LessonDetailsComponent},
];


