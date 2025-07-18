import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Playlist {
  _id: string;
  title: string;
  description: string;
  image: string;
  songs?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) {}
  // API URL
  private apiUrl = 'http://localhost:3000/api/playlists';

  getAllPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.apiUrl);
  }

  createPlaylist(title: string, description: string, imageFile: File) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', imageFile);

    return this.http.post(this.apiUrl, formData);
  }

}
