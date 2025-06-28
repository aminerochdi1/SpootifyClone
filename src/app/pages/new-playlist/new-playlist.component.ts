import { Component } from '@angular/core';
import { LandingComponent } from '../../features/landing/landing.component';
import { AddPlaylistComponent } from "../../features/add-playlist/add-playlist.component";
@Component({
  selector: 'app-new-playlist',
  standalone:true,
  imports: [LandingComponent, AddPlaylistComponent],
  templateUrl: './new-playlist.component.html',
  styleUrl: './new-playlist.component.scss'
})
export class NewPlaylistComponent {

}
