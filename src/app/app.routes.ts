import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { ListComponent } from './features/list/list.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'list', component: ListComponent },
  { path: '**', redirectTo: '' },
];
