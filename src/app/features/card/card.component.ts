import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from "../player/player.component";
import { PlaylistService, Playlist } from '../../services/playlist.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card',
  imports: [CommonModule, PlayerComponent],
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  playlists: Playlist[] = [];
  pageSize = 5;
  currentPage = 0;

  selectedPlaylist: any = null;

  @Input() image!: string;
  @Input() title!: string;
  @Input() description!: string;

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef<HTMLDivElement>;

  constructor(private playlistService: PlaylistService,private http: HttpClient) {}

  ngOnInit() {
    this.fetchPlaylists();
  }

  fetchPlaylists() {
    this.playlistService.getAllPlaylists().subscribe({
      next: (data: Playlist[]) => {
        this.playlists = data;
      },
      error: (err) => {
        console.error("Erreur de récupération des playlists :", err);
      }
    });
  }

  trackById(index: number, playlist: Playlist): string {
    return playlist._id;
  }

  get visiblePlaylists() {
    const start = this.currentPage * this.pageSize;
    return this.playlists.slice(start, start + this.pageSize);
  }

  get canShowNext() {
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

  openPlayer(playlistSummary: any) {
    this.http.get(`http://localhost:3000/api/playlists/${playlistSummary._id}`).subscribe({
      next: (playlistFull) => {
        this.selectedPlaylist = playlistFull;
      },
      error: (err) => {
        console.error('Erreur chargement playlist complète', err);
      }
    });
  }

  closePlayer() {
    this.selectedPlaylist = null;
  }

}
