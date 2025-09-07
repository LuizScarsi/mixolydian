import { Playlist } from "./Playlist";

class User {
    constructor(name, password) {
        this.name = name;
        this.password = password;
        this.playlists = [];
    };

    createPlaylist(playlistName) {
        const existingPlaylist = this.playlists.find(p => p.name === playlistName);
        if (existingPlaylist) {
            console.log("A playlist with this name already exists!");
            return;
        } else {
            const playlist = new Playlist(playlistName);
            this.playlists.push(playlist);
        }
    };

    ratePlaylist(playlistName, stars, review) {
        const playlist = this.playlists.find(p => p.name === playlistName);
        if (!playlist) {
            console.log("Playlist not found!");
            return;
        } else {
            rating = new Rating(stars, review);
            playlist.ratings.push(rating);
        }
    };

    addMusic(playlistName, music) {
        const playlist = this.playlists.find(p => p.name === playlistName);
        if (!playlist) {
            console.log("Playlist not found!");
            return;
        }
        const music = playlist.musics.find(m => m.name === music.name);
        if (music) {
            console.log("Music is already on playlist");
            return;
        } else {
            playlist.musics.push(music);
        }
    };

    listPlaylists() {
        return this.playlists;
    };

    listMusics(playlistName) {
        const playlist = this.playlists.find(p => p.name === playlistName);
        if (!playlist) {
            console.log("Playlist not found!");
            return;
        } else {
            return playlist.musics;
        }
    };
};

export { User };