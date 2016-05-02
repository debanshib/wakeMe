// alarm.state.js

app.config(function ($stateProvider) {
    $stateProvider.state('alarm', {
        url: '/alarm',
        resolve: {
            loggedInUser: function(AuthService){
             console.log('in the resolve auth service')
                return AuthService.getLoggedInUser();
            },
            alarm: function(AlarmFactory){
                var userId = '57252db059528a407fe20e9d';
                console.log('in alarm resolve')
                return AlarmFactory.getAlarm(userId);
            }
        },
        controller: 'AlarmCtrl',
        templateUrl: 'js/alarm/alarm.html'
    });
});
