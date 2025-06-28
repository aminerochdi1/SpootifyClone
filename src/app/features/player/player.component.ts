import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-player',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnInit, OnDestroy {

  currentSongTitle: string = '';
  currentSongArtist: string = '';

  loadingSong = false;


  @Input() playlist: any = null; // playlist complète reçue du parent
  @Output() close = new EventEmitter<void>();

  currentSongIndex = 0;
  isPlaying = false;

  audioContext!: AudioContext;
  audioBufferSourceNode!: AudioBufferSourceNode;
  audioBuffer!: AudioBuffer;

  ngOnInit() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (this.playlist && this.playlist.songs?.length) {
      this.currentSongIndex = 0;
      this.loadAndPlaySong(this.playlist.songs[this.currentSongIndex]);
    }
  }

  ngOnDestroy() {
    this.stopAudio();
    this.audioContext.close();
  }

  async loadAudio(url: string) {
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
  }


  async loadAndPlaySong(song: any) {
    if (this.loadingSong) return;  // Ignore if loading already
    this.loadingSong = true;

    if (!song) {
      this.loadingSong = false;
      return;
    }

    this.currentSongTitle = song.title;
    this.currentSongArtist = song.artist;

    await this.stopAudio();

    const songUrl = `http://localhost:3000/${song.file}`;
    await this.loadAudio(songUrl);

    this.loadingSong = false;
    this.play();
  }

  stopAudio(): Promise<void> {
    return new Promise((resolve) => {
      if (this.audioBufferSourceNode) {
        try {
          this.audioBufferSourceNode.onended = null;  // Remove old event listener
          this.audioBufferSourceNode.stop();
        } catch {

        }
        try {
          this.audioBufferSourceNode.disconnect();
        } catch {}

        this.audioBufferSourceNode = null!;
      }
      this.isPlaying = false;
      resolve();
    });
  }

  play() {
    this.audioBufferSourceNode = this.audioContext.createBufferSource();
    this.audioBufferSourceNode.buffer = this.audioBuffer;
    this.audioBufferSourceNode.connect(this.audioContext.destination);
    this.audioBufferSourceNode.start(0);

    this.isPlaying = true;

    this.audioBufferSourceNode.onended = () => {
      this.isPlaying = false;
      this.playNext(); // Automatically play next song after current ends
    };
  }

  playNext() {
    this.currentSongIndex++;
    if (this.currentSongIndex >= this.playlist.songs.length) {
      this.currentSongIndex = 0;
    }
    this.loadAndPlaySong(this.playlist.songs[this.currentSongIndex]);
  }

  playPrevious() {
    if (!this.playlist || !this.playlist.songs.length) return;

    this.currentSongIndex--;
    if (this.currentSongIndex < 0) {
      this.currentSongIndex = this.playlist.songs.length - 1;
    }
    this.loadAndPlaySong(this.playlist.songs[this.currentSongIndex]);
  }

  closePlayer() {
    this.close.emit();
    this.stopAudio();
  }


}
