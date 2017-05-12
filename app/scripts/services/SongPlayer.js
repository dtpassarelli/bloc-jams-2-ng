(function() {
	function SongPlayer ($rootScope, Fixtures) {
		var SongPlayer ={};

		/**
		*@ variable currentAlbum
		*@ created a private variable to stor the current album data
		*/
		var currentAlbum = Fixtures.getAlbum();
		
		/**
		* @desc Buzz object audio file
		* @type {Object}
		*/
		var currentBuzzObject = null;

		/**
		*@function playSong
		*@ created playSong function that will play the song and set song.playing to true
		*/
		var playSong = function (song) {
			currentBuzzObject.play();
			song.playing = true;
		};

		/**
 		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var setSong = function (song) {
			if (currentBuzzObject) {
				stopSong(song);
			}
			

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentBuzzObject.bind('timeupdate', function() {
				$rootScope.$apply(function() {
					SongPlayer.currentTime = currentBuzzObject.getTime();
				});
			});

			SongPlayer.currentSong = song;
		};

		

		/**
 		* @function getSongIdex
		* @desc gets the index of the song to keep track of which song it needs to be playing
		*/
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};

		var stopSong = function(song) {
			currentBuzzObject.stop();
			SongPlayer.currentSong.playing = null;
		}

		
		/**
		* @desc Active song object from list of songs
		* @type {Object}
		*/
		SongPlayer.currentSong = null;

		/**
		* @desc Current playback time (in seconds) of currently playing song
		* @type {Number}
		*/
		SongPlayer.currentTime = null;

		/**
		* @function setCurrentTime
		* @Set current time (in seconds) of currently playing song
		* @param {Number} time
		*/
		SongPlayer.setCurrentTime = function(time) {
			if (currentBuzzObject) {
				currentBuzzObject.setTime(time);
			}
		};

		SongPlayer.play = function (song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					currentBuzzObject.play();
				}
			}
				
		};

		SongPlayer.pause = function (song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};

		/**
		* @desc Public function that moves the currentSongIndex back by one and stops the song inf the currentSongIndex is less than 0
		* @function SongPlayer.previous
		*/
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			if (currentSongIndex < 0) {
				stopSong(song);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		/**
		* @desc Public function that moves the currentSongIndex up by one and stops the song inf the currentSongIndex is less than 0
		* @function SongPlayer.next
		*/
		SongPlayer.next = function () {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;
			if (currentSongIndex < 0) {
				stopSong(song);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		SongPlayer.volume = null;


		SongPlayer.setVolume = function(volume) {
			currentBuzzObject.setVolume(volume);
		};

		

		return SongPlayer;
	}
	angular
		.module('blocJams')
		.factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();