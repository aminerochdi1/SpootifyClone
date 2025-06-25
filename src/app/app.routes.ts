import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      // { path: '', component:  },
      // { path: '', component:  },
      // etc.
    ]
  },
  { path: '**', redirectTo: '' },
];
