import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LibraryPageComponent } from './pages/library-page/library-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'library', component: LibraryPageComponent },
  { path: '**', redirectTo: '' },
];
