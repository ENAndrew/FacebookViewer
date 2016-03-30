/* global require */

var express = require('express');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


var app = express();

app.use(session({ secret: 'ericas-random-string'}));
app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(obj, done){
    done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: '...',
    clientSecret: '...',
    callbackURL: 'http://localhost:8000/auth/facebook/callback'
}, function(token, refreshToken, profile, done){
    return done(null, profile);
}));



app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', {
        failureRedirect: '/login',
        successRedirect: '/me'}),
    function(req, res) {
        console.log(req.user);
        res.redirect('/');
    });
    
app.get('/me', function(req, res, next){
    res.send(req.user);
});

app.listen(8000, function(){
    console.log('Listening on port 8000');
});


