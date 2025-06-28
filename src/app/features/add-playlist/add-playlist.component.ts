import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../services/playlist.service';
import { FormsModule } from '@angular/forms';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Component({
  selector: 'app-add-playlist',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.scss']
})
export class AddPlaylistComponent {
  selectedFile!: File;
  title = '';
  description = '';

  imagePreview: string | ArrayBuffer | null = null;

  private notyf = new Notyf();

  constructor(private playlistService: PlaylistService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      this.imagePreview = null;
      this.selectedFile = undefined!;
      return;
    }

    const file = input.files[0];

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      this.notyf.error('Format de fichier non supporté. Veuillez choisir un fichier JPG, JPEG ou PNG.')
      input.value = '';
      this.imagePreview = null;
      this.selectedFile = undefined!;
      return;
    }

    this.selectedFile = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (!this.title || !this.description || !this.selectedFile) {
      alert('Veuillez remplir tous les champs et choisir une image.');
      return;
    }

    this.playlistService.createPlaylist(this.title, this.description, this.selectedFile).subscribe({
      next: (res) => this.notyf.success('Playlist créée avec succès!'),
      error: (err) =>this.notyf.error('Erreur lors de la création de la playlist'),
    });
  }


}
