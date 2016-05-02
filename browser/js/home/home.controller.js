// home.controller.js

app.controller('HomeCtrl', function(alarm, AlarmFactory, $state, $scope, $timeout, $interval, $q, $log) {
	$scope.currentTime;
	// $scope.alarm = alarms[alarms.length-1];
	// $scope.alarms = alarms;
	// $scope.alarmLive = true;
	// console.log('scope.alarms', $scope.alarms);
	// $scope.link;

	$scope.getPlaylistTracks = function(){
		console.log('clicked to get playlists')
		AlarmFactory.getPlaylistTracks()
		.then(function(tracks){
			// var tracks = playlists.playlists.items[0].tracks;
			console.log('found tracks in controller!', tracks);
			// $scope.playlists = playlists;
			$scope.tracks = tracks;
		})
	}

	$scope.getTrack = function(){
		AlarmFactory.getTrack()
		.then(function(track){
			console.log('found ONE track in controller:', track)
			$scope.song = track;
			$scope.link = track.preview_url
			var link = $scope.link;
			$scope.start(link);
		})
	}

	// var audio = document.createElement('audio');
	// $scope.start = function(link){
	// 	audio.src = link;
	// 	audio.load();
	// }

	var getCurrentTime = function(){
		var now = new Date();
		var currentTime = {
			full: now,
			hours: now.getHours(),
			minutes: now.getMinutes(),
			seconds: now.getSeconds()
		};
		$scope.currentTime = currentTime;
		return currentTime;
	}


	$scope.setAlarm = function(input){
		var hours = Number(input.hours);
		var minutes = Number(input.minutes);
		var AMPM = input.AMPM;
		var mHours = hours;
		if (hours === 12) mHours = 0;
		if (AMPM === 'PM') mHours += 12;
		var alarm = new Date();
		alarm.setHours(mHours);
		alarm.setMinutes(minutes);
		alarm.setSeconds(0);
		var newAlarm = {
			full: alarm,
			hours: hours,
			minutes: minutes,
			seconds: 0,
			AMPM: AMPM
		};
		return newAlarm;
	}

	
	$scope.createAlarm = function(input){
		var newAlarm = $scope.setAlarm(input);
		AlarmFactory.createNewAlarm(newAlarm)
		.then(function(newAlarm){
			$scope.alarm = newAlarm;
			return newAlarm;
		})
	}

	var getAlarms = function(){
		AlarmFactory.getAlarms()
		.then(function(alarms){
			console.log('get alarms in ctrl:', alarms)
			$scope.alarms = alarms.data;
		})
	}
	$scope.alarmLive

	// var checkOneAlarm = function(){
	// 	if ($scope.alarm.isActive){
	// 		var alarm = $scope.setAlarm({
	// 			hours: $scope.alarm.hours,
	// 			minutes: $scope.alarm.minutes,
	// 			AMPM: $scope.alarm.AMPM

	// 		})
	// 		if ($scope.alarmLive && (getCurrentTime().full > alarm.full)){
	// 			console.log('ALARM HIT!');
	// 			$timeout(sendVoice, 100);
	// 			alert('Wake up!!!');
	// 			// $scope.alarmLive = false;
	// 		}
	// 	}
	// }








	// var checkAlarms = function(){
	// 	var active = $scope.alarms.filter(function(alarm){return (alarm.isActive === true)});
	// 	console.log('active alarms', active);
	// 	$scope.alarmLive = true;
	// 	active.forEach(function(alarm){
	// 		var alarm = $scope.setAlarm({
	// 			hours: alarm.hours,
	// 			minutes: alarm.minutes,
	// 			AMPM: alarm.AMPM
	// 		})
	// 		console.log('alarm', alarm);
	// 		// if ($scope.alarmLive === true && getCurrentTime().full > alarm.full) {
	// 		if (getCurrentTime().full > alarm.full) {
	// 			console.log('ALARM HIT!!!');
	// 			$timeout(sendVoice, 100);
	// 			$scope.alarmLive = false;
	// 		}
	// 	})
	// }

	// var sendVoice = function(){
	// 	responsiveVoice.speak($('#text').val(),$('#voiceselection').val())
	// }

	// var checkAlarms = function(){
	// 	$scope.alarm = setAlarm(12, 43, 'PM');
	// 	if ($scope.currentTime.full > $scope.alarm.full) console.log('ALARM HIT!!!');
	// }
 
	// $interval(getCurrentTime, 1000)

	// $interval(checkOneAlarm, 1000);

});