/*home.state.js*/

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        // resolve: {
        //   //   loggedInUser: function(AuthService){
	       //  	// console.log('in the resolve auth service')
        //   //       return AuthService.getLoggedInUser();
        //   //   },
        //     alarms: function(AlarmFactory){
        //         return AlarmFactory.getAlarms()
        //         // .then(function(alarms){
        //         // 	console.log('alarms data', alarms)
        //         // 	return alarms;
        //         // })
        //     }
        // },
        // controller: 'HomeCtrl'
    });
});