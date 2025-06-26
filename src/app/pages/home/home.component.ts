import { Component } from '@angular/core';
import { LandingComponent } from "../../features/landing/landing.component";
import { CardComponent } from "../../features/card/card.component";
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [LandingComponent, CardComponent,AppComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
