import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { AppComponent } from '../../app.component';
import { ListComponent } from "../list/list.component";

@Component({
  selector: 'app-landing',
  imports: [CardComponent, ListComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
