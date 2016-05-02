app.controller('AlarmCtrl', function(alarm, loggedInUser, $scope, $timeout, $interval, $q, $log, AlarmFactory) {
	//set alarm
	$scope.alarm = AlarmFactory.getCached();
	$scope.user = loggedInUser;
	$scope.input;
	$scope.settingAlarm = false;
	$scope.alarmLive = false;
	
	$scope.setupAlarm = function(){
		$scope.settingAlarm = true;
	}

	//helper function
	$scope.setAlarm = function(input){
		console.log('input: ', input)
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
	

	//save new alarm
	$scope.saveAlarm = function(input){
		var newAlarm = $scope.setAlarm(input);
		newAlarm.userId = $scope.user._id;
		AlarmFactory.createNewAlarm(newAlarm)
		.then(function(newAlarm){
			console.log('NEW ALARM in ctrl', newAlarm)
			$scope.alarm = newAlarm;
			$scope.settingAlarm = false;
		})
	}
	

	//trigger alarm at appropriate time
	var checkAlarm = function(){
		var alarm = $scope.setAlarm({
			hours: $scope.alarm.hours,
			minutes: $scope.alarm.minutes,
			AMPM: $scope.alarm.AMPM
		})
		console.log('alarm', $scope.alarm);
		if ($scope.alarm.isActive && getTime().full > alarm.full) {
			console.log('ALARM HIT!!!');
			$scope.alarmLive = true;
			$timeout(sendVoice, 100);
			alert('WAKE UP!!!')
		}
	}

	//trigger voice
	var sendVoice = function(){
		responsiveVoice.speak($('#text').val(),$('#voiceselection').val())
	}

	$interval(checkAlarm, 1000);

	$scope.turnOffAlarm = function(){
		$scope.alarm.isActive = false;
		$scope.alarmLive = false;
		console.log('in turn off alarm function')
		AlarmFactory.updateAlarm({isActive: false, userId: $scope.user._id, alarmId: $scope.alarm._id})
	}

	$scope.snooze = function(){
		//CHECK THIS???????? v
		$scope.alarmLive = false;
		var min = $scope.alarm.minutes;
		var hours = $scope.alarm.hours;
		var AMPM = $scope.alarm.AMPM;
		if (min >= 55) {
			min = (min - 60 + 5);
			if (hours === 11 && AMPM === 'AM') AMPM = 'PM'
			if (hours === 11 && AMPM === 'PM') AMPM = 'AM'
			if (hours === 12) {
				hours = 1;
			}
			else hours += 1;
		}
		else {
			min += 5;
			console.log('minutes new', min);
		}
		AlarmFactory.updateAlarm({minutes: min, hours: hours, AMPM: AMPM, userId: $scope.user._id, alarmId: $scope.alarm._id})
		.then(function(updatedAlarm){
			console.log('updated from snooze', updatedAlarm)
			$scope.alarm = updatedAlarm;
		})
	}

	//clock
	$scope.time;
	var getTime = function(){
		var now = new Date();
		var hours = now.getHours();
		if (hours > 12) {
			var AMPM = 'PM'
		}
		if (hours > 13){
			hours = hours - 12;
		}
		else AMPM = 'AM'
		var currentTime = { 
			full: now, 
			hours: hours,
			minutes: now.getMinutes(), 
			seconds: now.getSeconds(),
			AMPM: AMPM
		};
		$scope.time = currentTime;
		return currentTime;
	}

	$interval(getTime, 1000)

	// $scope.deleteAlarm = function(){
	// 	AlarmFActory.deleteAlarm()
	// }


});