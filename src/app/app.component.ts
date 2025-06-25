import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingComponent } from "./features/landing/landing.component";
import { CardComponent } from "./features/card/card.component";

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, LandingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'spootify-clone-angular';
}
