import { Component } from '@angular/core';
import { LandingComponent } from '../../features/landing/landing.component';
import { LibraryComponent } from '../../features/library/library.component';

@Component({
  selector: 'app-library-page',
  standalone:true,
  imports: [LandingComponent,LibraryComponent],
  templateUrl: './library-page.component.html',
  styleUrl: './library-page.component.scss'
})
export class LibraryPageComponent {

}
