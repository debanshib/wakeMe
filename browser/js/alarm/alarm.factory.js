app.factory('AlarmFactory', function($http){

	console.log('in the alarm factory');

    var AlarmFactory = {};

    var cached = {};

    AlarmFactory.getCached = function(){
        console.log('CACHE IN FACT', cached);
        return cached;
    }

    AlarmFactory.getAlarm = function(userId){
        return $http.get('/api/alarm/' + userId)
        .then(function(alarms){
          console.log('in factory found alarms:', alarms.data)
            var alarms = alarms.data;
            var alarm = alarms[alarms.length-1];
            console.log('found one alarm in factory', alarm)
            angular.copy(alarm, cached);
            console.log('in getAlarm in factory. cache:', cached)
            return cached;
      })
    };

    AlarmFactory.createNewAlarm = function(data){
    	console.log('input in factory', data)
      return $http.post('/api/alarm/' + data.userId, {
    		owner: data.userId,
    		full: data.full, 
    		hours: data.hours,
    		minutes: data.minutes,
    		seconds: data.seconds,
    		AMPM: data.AMPM
    	})
    	.then(function(newAlarm){
        console.log('new alarm in factory:', newAlarm)
        angular.copy(newAlarm.data, cached)
        console.log('in createAlarm in factory. cache:', cached)
        return cached;
    	})
    }

    AlarmFactory.updateAlarm = function(data){
    	console.log('in update alarm factory function. data:', data)
        return $http.put('/api/alarm/' + data.userId + '/' + data.alarmId, data)
    	.then(function(updatedAlarm){
            var updatedAlarm = updatedAlarm.data;
            angular.copy(updatedAlarm, cached);
            console.log('updated alarm in factory funct: ', cached)
            return cached;
    	})
    }


 //    AlarmFactory.deleteAlarm = function(alarmId){
 //    	return $http.delete('/api/alarm/' + userId + '/' + alarmId)
 //    	.then(function(){
 //  			console.log('deleted');
 //    	})
 //    }

 // var userId = '57252db059528a407fe20e9d';


    // AlarmFactory.getAlarms = function(){
    //     return $http.get('/api/alarm/' + userId)
    //     .then(function(alarms){
    //      console.log('in factory found alarms:', alarms.data)
    //         var alarms = alarms.data;
    //         // angular.copy(alarms, cache)
    //         // return cache;
    //         return alarms;
    //  })
    // };

    return AlarmFactory;
});
