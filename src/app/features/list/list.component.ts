import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Song } from '../../services/song.service';
import { SongService } from '../../services/song.service';
import { HttpClient } from '@angular/common/http';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  songs: Song[] = [];
  currentSong: HTMLAudioElement | null = null;
  currentSongId: number | null = null;
  currentSongUrl: string | null = null;
  audioContext!: AudioContext;
  audioBufferSourceNode!: AudioBufferSourceNode;
  audioBuffer!: AudioBuffer;
  songsPerPage = 5;
  currentPage = 1;
  startTime = 0;
  pausedAt = 0;
  isPlaying:boolean = false;

  isLoading = true;

  currentTime = 0;
  duration = 0;
  animationFrameId: number | null = null;

  likedSongIds: Set<string> = new Set();

  private notyf = new Notyf();

  // ID de la playlist "chansons préférées"
  readonly likedPlaylistId = '685ed919ef877259a3586bad';

  constructor(private songService: SongService, private http: HttpClient) {}

  get totalPages(): number {
    return Math.ceil(this.songs.length / this.songsPerPage);
  }

  get paginatedSongs() {
    const startIndex = (this.currentPage - 1) * this.songsPerPage;
    return this.songs.slice(startIndex, startIndex + this.songsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
  }

  ngOnInit() {
    if (!sessionStorage.getItem('pageReloaded')) {
      sessionStorage.setItem('pageReloaded', 'true');
      location.reload();
    } else {
      sessionStorage.removeItem('pageReloaded');
    }

    this.isLoading = true;

    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    this.songService.getAllSongs().subscribe({
      next: (data) => {
        this.songs = data;
        this.isLoading = false;  // stop loader à la réception des données
      },
      error: (err) => {
        console.error('Erreur API Songs :', err);
        // this.isLoading = false;
      }
    });

  }

  pause() {
    if (!this.isPlaying) return;

    this.audioBufferSourceNode.stop();
    this.pausedAt = this.audioContext.currentTime - this.startTime;
    this.isPlaying = false;
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }

  async loadAudio(url: string) {
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.duration = this.audioBuffer.duration;
  }

  play() {
    if (this.isPlaying) return;

    this.audioBufferSourceNode = this.audioContext.createBufferSource();
    this.audioBufferSourceNode.buffer = this.audioBuffer;
    this.audioBufferSourceNode.connect(this.audioContext.destination);

    const offset = this.pausedAt;
    this.startTime = this.audioContext.currentTime - offset;
    this.audioBufferSourceNode.start(0, offset);

    this.isPlaying = true;

    this.audioBufferSourceNode.onended = () => {
      this.isPlaying = false;
      this.pausedAt = 0;
      this.currentTime = 0;
      if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    };

    this.updateTime();
  }

  seek(event: any) {
    const seekTime = +event.target.value;
    this.pausedAt = seekTime;
    if (this.isPlaying) {
      this.pause();
      this.play();
    } else {
      this.currentTime = seekTime;
    }
  }

  updateTime() {
    this.currentTime = this.audioContext.currentTime - this.startTime;
    if (this.currentTime > this.duration) {
      this.currentTime = this.duration;
    }
    this.animationFrameId = requestAnimationFrame(() => this.updateTime());
  }

  formatTime(seconds: number | undefined): string {
    if (!seconds || isNaN(seconds)) return '0:00';

    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  }


  async playSong(song: Song) {
    const songUrl = 'http://localhost:3000/' + song.file;

    if (this.isPlaying && this.currentSongId === song._id) {
      this.pause();
      return;
    }

    this.pause();

    this.currentSongUrl = songUrl;
    this.currentSongId = song._id;

    await this.loadAudio(songUrl);
    this.play();
  }


 // Pour ajouter une chanson aux favoris (ajout)
addToLiked(songId: string) {
  this.likedSongIds.add(songId);

  const body = {
    songIds: [songId],  // On envoie uniquement la chanson à ajouter
  };

  this.http.patch(`http://localhost:3000/api/playlists/${this.likedPlaylistId}`, body).subscribe({
    next: () => {
      this.notyf.success('Ajouté à vos chansons préférées!');
    },
    error: (err) =>
      this.notyf.error('Ajout à votre bibliothèque échoué !')
  });
}

// Pour retirer une chanson des favoris (suppression)
removeFromLiked(songId: string) {
  this.likedSongIds.delete(songId);

  const body = {
    songIds: [songId],  // On envoie uniquement la chanson à retirer
  };

  this.http.patch(`http://localhost:3000/api/playlists/${this.likedPlaylistId}/remove`, body).subscribe({
    next: () => console.log('Chanson retirée de la playlist'),
    error: (err) => console.error('Erreur suppression chanson de la playlist:', err),
  });
}

toggleLike(song: Song) {
  if (this.isSongLiked(song._id.toString())) {
    this.removeFromLiked(song._id.toString());
  } else {
    this.addToLiked(song._id.toString());
  }
}

isSongLiked(songId: string): boolean {
  return this.likedSongIds.has(songId);
}



}
