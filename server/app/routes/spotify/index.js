// index.js

'use strict';
var router = require('express').Router();
var _ = require('lodash');
var SpotifyWebApi = require('spotify-web-api-node');

module.exports = router;

// Get multiple albums

var playlistId = '7JNPDieyce4ZZTBYlTGa6f'

// Search playlists whose name or description contains 'workout'
var spotifyApi = new SpotifyWebApi();
router.get('/searchPlaylists/:userId', function(req, res, next){
	// var search = req.body.search;
	console.log('in route to search playlist')
	var search = 'workout'
	return spotifyApi.searchPlaylists(search)
  	.then(function(data) {
  		console.log('data from search playlists', data.body)
  		res.send(data.body)
  		// var playlist = data.body.playlists.items[0];
  		// console.log('user id', userId);
  		// console.log('playlist id: ', playlist.id);
  		// return spotifyAPI.getPlaylistTracks(userId, playlist.id, { 'offset' : 1, 'limit' : 5, 'fields' : 'items' })
  	// })
  	// .then(function(playlist){
  	// 	console.log('playlist data', playlist.body)
  	// 	res.send(playlist.body)
  	})
  	.catch(function(err) {
    console.log('Something went wrong!', err);
  	});
})


router.get('/getUsersPlaylist', function(req, res, next){
	return spotifyApi.getUserPlaylists('debanshibheda')
  	.then(function(data) {
    console.log('Retrieved playlists', data.body);
  	},function(err) {
    console.log('Something went wrong!', err);
  	});
})

// router.get('/getPlaylistTracks/', function(req, res, next){
// 	console.log('in route to play tracks')
// 	// var playlistId = '7JNPDieyce4ZZTBYlTGa6f';
// 	// var userId = '57252db059528a407fe20e9d';
// 	return spotifyApi.getPlaylistTracks('57252db059528a407fe20e9d', '7JNPDieyce4ZZTBYlTGa6f', { 'offset' : 1, 'limit' : 5, 'fields' : 'items' } )
// 	.then(function(song){
// 		console.log('song data', song.data);
// 		res.send(song.data);
// 	})
	
// })

var trackId = '1zHlj4dQ8ZAtrayhuDDmkY'
router.get('/getTrack', function(req, res, next){
	console.log('in route to get track');
	return spotifyApi.getTrack(trackId)
	.then(function(track){
		console.log('route found track: ', track)
		res.send(track.body);
	})
})

// router.get('/getFeaturedPlaylists', function(req, res, next){
// 	var search = { limit : 3, offset: 1, country: 'SE', locale: 'sv_SE', timestamp:'2014-10-23T09:00:00' }
// 	spotifyApi.getFeaturedPlaylists(search)
// 	.then(function(data) {
// 		console.log(data.body);
// 	    res.send(data.body);
// 	})
// 	.catch(function(err){
// 		console.log("Something went wrong!", err);
// 	})
// });