import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';

//const GoogleStrategy = require('passport-google-oauth2').Strategy;
import { Strategy } from 'passport-google-oauth2';

passport.use(
	new Strategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3500/api/v1/auth/google/callback',
		},
		function (accessToken, refreshToken, profile, done) {
			return done(err, profile);
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});
