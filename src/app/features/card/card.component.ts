import { Component,Input,ViewChild,ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from "../player/player.component";

interface Playlist {
  id: number;
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-card',
  imports: [CommonModule, PlayerComponent],
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  playlists: Playlist[] = [
    {
      id: 1,
      image: 'https://i.scdn.co/image/ab67706f000000026383701ce8b3495cf507d796',
      title: "Today's Top Hits",
      description: "Bad Bunny is on top of the Hottest 50!"
    },
    {
      id: 2,
      image: 'https://i.scdn.co/image/ab67706f00000002d28cc600e29364a65d463ee2',
      title: "RapCaviar",
      description: "New music from Roddy Ricch, and more."
    },
  ];

  pageSize = 5;
  currentPage = 0;

  selectedPlaylist: { id: string, title: string, description: string, image: string } | null = null;

  @Input() image!: string;
  @Input() title!: string;
  @Input() description!: string;

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef<HTMLDivElement>;

  trackById(index: number, playlist: Playlist): number {
    return playlist.id;
  }

  get visiblePlaylists() {
    // Retourne uniquement les playlists de la page courante
    const start = this.currentPage * this.pageSize;
    return this.playlists.slice(start, start + this.pageSize);
  }

  get canShowNext() {
    // Indique s'il y a une page suivante
    return (this.currentPage + 1) * this.pageSize < this.playlists.length;
  }

  get canShowPrev() {
    return this.currentPage > 0;
  }

  showNext() {
    if (this.canShowNext) {
      this.currentPage++;
    }
  }

  showPrev() {
    if (this.canShowPrev) {
      this.currentPage--;
    }
  }

  reset() {
    this.currentPage = 0;
  }

  openPlayer(playlist: any) {
    this.selectedPlaylist = playlist;
  }

  closePlayer() {
    this.selectedPlaylist = null;
  }


}
