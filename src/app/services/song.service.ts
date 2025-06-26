import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Song {
  _id: number;
  title: string;
  artist: string;
  duration: number | null;
  file: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class SongService {
  private apiUrl = 'http://localhost:3000/api/songs';

  constructor(private http: HttpClient) {}

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.apiUrl);
  }
}
