"use strict";

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			name: DataTypes.STRING,
			email: DataTypes.STRING,
		},
		{
			sequelize,
			tableName: "users",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
		},
	);

	User.associate = function (models) {
		User.hasMany(models.UserPlaylist, {
			foreignKey: "id_user",
			sourceKey: "id",
		});
	};

	return User;
};

// import { Playlist } from "./Playlist.js";
// const { createUser } = require("../repositories/userRepository.js");

// class User {
//     constructor(name, email) {
//         this.name = name;
//         this.password_hash = null;
//         this.email = email;
//         this.playlists = [];
//     };

//     async setPassword(password) {
//         this.password_hash = await bcrypt.hash(password, 10);
//     }

//     async save() {
//         createUser(this);
//     }

//     async update(name, email) {

//     }

//     createPlaylist(playlistName) {
//         const existingPlaylist = this.playlists.find(p => p.name === playlistName);
//         if (existingPlaylist) {
//             console.log("A playlist with this name already exists!");
//             return;
//         } else {
//             const playlist = new Playlist(playlistName);
//             this.playlists.push(playlist);
//         }
//     };

//     ratePlaylist(playlistName, stars, review) {
//         const playlist = this.playlists.find(p => p.name === playlistName);
//         if (!playlist) {
//             console.log("Playlist not found!");
//             return;
//         } else {
//             rating = new Rating(stars, review);
//             playlist.ratings.push(rating);
//         }
//     };

//     addMusic(playlistName, music) {
//         const playlist = this.playlists.find(p => p.name === playlistName);
//         if (!playlist) {
//             console.log("Playlist not found!");
//             return;
//         }
//         const existingMusic = playlist.musics.find(m => m.name === music.name);
//         if (existingMusic) {
//             console.log("Music is already on playlist");
//             return;
//         } else {
//             playlist.musics.push(music);
//         }
//     };

//     listPlaylists() {
//         return this.playlists;
//     };

//     listMusics(playlistName) {
//         const playlist = this.playlists.find(p => p.name === playlistName);
//         if (!playlist) {
//             console.log("Playlist not found!");
//             return;
//         } else {
//             return playlist.musics;
//         }
//     };
// };

// export { User };
