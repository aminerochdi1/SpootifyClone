# Spotify Clone - Angular 19 Music Player

A Spotify-inspired music streaming app built with Angular 19, Node.js + Express API, and offline playback support.

## 📌 Key Features

- Offline Playback – Songs stored locally (no internet needed).
- Cloud Album Art – Covers fetched from a 3rd-party API.
- Playlist Management – Create, Edit, and Organize playlists.
- Search & Browse – Find songs, artists, and playlists.
- Responsive UI – Works on desktop & mobile.

## Tech Stack


| **Frontend**       | **Backend**        | **Database**       |
|--------------------|--------------------|--------------------|
| ![Angular]         | ![Node.js]         | ![MongoDB]         |
| Angular 19         | Node.js + Express  | MongoDB (local)    |
| RxJS               | REST API           | Cloud (album art)  |
| SCSS               | Mongoose ODM       |                    |

[Angular]: https://img.shields.io/badge/-Angular-DD0031?logo=angular
[Node.js]: https://img.shields.io/badge/-Node.js-339933?logo=node.js
[MongoDB]: https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb

## Quick Start

## Prerequisites
Tool
- Node.js ≥ 18
- Angular CLI	
- MongoDB (Local)	
- Yarn (Optional)	

# Setup

1. Database Import

## Restore the sample database (music_playerdb):

[music_playerdb](https://github.com/aminerochdi1/SpootifyClone/tree/main/backup/music_playerdb)

- mongorestore --db=music_playerdb backup/music_playerdb

Or for a single JSON file

## Export
mongoexport --db=music_playerdb --collection=songs --out=songs.json

## Import
mongoimport --db=music_playerdb --collection=songs --file=songs.json

2. Backend (Node.js + Express)

cd backend
npm install
npm start  # Runs on http://localhost:3000

3. Frontend (Angular 19)

cd frontend
npm install
npm start  # Runs on http://localhost:4200

Notes
- Songs are stored locally (no streaming server needed).

- Album art is fetched from 3rd-party APIs (e.g., Spotify, Last.fm).

- No authentication (for simplicity, but can be added via Firebase/OAuth).

# 🤝 Contributing
Fork the repository

- Create a new branch (git checkout -b feature/YourFeature)

- Commit changes (git commit -m 'Add some feature')

- Push to branch (git push origin feature/YourFeature)

- Open a Pull Request

# DEMO (Mookup)
https://vimeo.com/1103971618



