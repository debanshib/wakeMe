// music.factory.js

app.factory('MusicFactory', function($http){

	console.log('in the music factory');

    var MusicFactory = {};

    var cached = [];


 //    MusicFactory.getCache = function(){
 //        console.log(cached);
 //        return cached;
 //    }


 // var audio = document.createElement('audio');

  // define the factory value

  // var player = {};

  // player.pause = function () {
  //   audio.pause();
  //   playing = false;
  // };

  // player.resume = function () {
  //   audio.play();
  //   playing = true;
  // };

  // player.start = function (song, list) {
  //   player.pause();
  //   audio.src = song.audioUrl;
  //   audio.load();
  //   currentSong = song;
  //   currentList = list;
  //   player.resume();
  // };

  // player.isPlaying = function () {
  //   return playing;
  // };

  // player.getCurrentSong = function () {
  //   return currentSong;
  // };



// var userId = '57252db059528a407fe20e9d';

	// MusicFactory.getPlaylistTracks = function(){
 //    console.log('in here')
	// 	return $http.get('/api/spotify/getPlaylistTracks')
	// 	.then(function(tracks){
	// 		console.log('tracks found in factory:', tracks)
	// 		return tracks.data;
	// 	})
	// }


 //  MusicFactory.getPlaylistTracks = function(userId, playlistId){
 //    return $http({
 //      method: 'GET',
 //      url: 'https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks -H "Authorization: Bearer {f6ee19b0befe423daff0e520cb54e997}"'
 //    }).then(function(response){
 //      return response.data;
 //    })
 // }

  MusicFactory.getPlaylist = function(){
    console.log('in factory searchPlaylists function')
    return $http.get('/api/spotify/searchPlaylists/' + userId + '/playlist/' + playlistId)
    .then(function(playlist){
      console.log('playlist found in factory:', playlists)
      return playlist.data;
    })
  };



 	MusicFactory.searchPlaylists = function(){
 		console.log('in factory searchPlaylists function')
 		return $http.get('/api/spotify/searchPlaylists/' + userId)
 		.then(function(playlists){
 			console.log('playlists found in factory:', playlists)
 			return playlists.data;
 		})
 	};


  // var trackId = '1zHlj4dQ8ZAtrayhuDDmkY'
// var trackId = '0eGsygTp906u18L0Oimnem'
 	MusicFactory.getTrack = function(trackId){
 		return $http.get('/api/spotify/getTrack/' + trackId)
 		.then(function(track){
 			console.log('found track in factory:', track)
 			return track.data;
 		})
 	}




    return MusicFactory;
});
