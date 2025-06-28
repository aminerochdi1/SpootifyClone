import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LibraryPageComponent } from './pages/library-page/library-page.component';
import { NewPlaylistComponent } from './pages/new-playlist/new-playlist.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'library', component: LibraryPageComponent },
  { path: 'addplaylist', component: NewPlaylistComponent },
  { path: '**', redirectTo: '' },
];
