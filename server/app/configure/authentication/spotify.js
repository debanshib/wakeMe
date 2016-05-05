'use strict';
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

// credentials are optional


module.exports = function (app) {

    // var spotifyApi = new SpotifyWebApi({
    //   clientId : 'fcecfc72172e4cd267473117a17cbd4d',
    //   clientSecret : 'a6338157c9bb5ac9c71924cb2940e1a7',
    //   redirectUri : 'http://www.example.com/callback'
    // });

    // var facebookConfig = app.getValue('env').FACEBOOK;

    var spotifyCredentials = {
        clientID: 'f6ee19b0befe423daff0e520cb54e997',
        clientSecret: '813846bb26dc4693b2a35f1c897945fc',
        callbackURL: 'http://localhost:1337/auth/spotify/callback'
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
        console.log('verify callback running');

        UserModel.findOne({ 'spotify.id': profile.id }).exec()
            .then(function (user) {

                if (user) {
                    return user;
                } else {
                    return UserModel.create({
                        spotify: {
                            id: profile.id,
                            email: profile.id,
                            token: refreshToken
                        }
                    });
                }

            })
            .then(function (userToLogin) {
                console.log('USER INFO', userToLogin);
                done(null, userToLogin);
            })
            .catch(function (err) {
                console.error('Error creating user from Spotify authentication', err);
                done(err);
            })

    };

    // passport.use(new SpotifyStrategy(spotifyApi, verifyCallback));


    passport.use(new SpotifyStrategy(spotifyCredentials, verifyCallback));

    app.get('/auth/spotify', passport.authenticate('spotify'));

    app.get('/auth/spotify/callback',

        passport.authenticate('spotify', { failureRedirect: '/login' }),
        function (req, res) {
            console.log('res', res)
            res.redirect('/alarm');
        });

    // app.get('/authorize/spotify', )

};
