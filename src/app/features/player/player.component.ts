import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-player',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  @Output() close = new EventEmitter<void>();
  currentTime = 0;
  duration = 0;
  hoverTime: number | null = null;
  isPlaying:boolean = false;

  @Input() playlist:
  { id: string;
    title: string;
    description: string;
    image: string } | null = null;

    showTrack: boolean = false;

    toggleTrack() {
      this.showTrack = !this.showTrack;
    }

  closePlayer() {
    this.close.emit();
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
  }

}
