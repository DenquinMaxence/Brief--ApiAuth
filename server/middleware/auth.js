import dotenv from 'dotenv';
dotenv.config();

import passport from 'passport';
import { Strategy } from 'passport-local';

import userModel from '../models/userModel.js';

import JWT from 'passport-jwt';
const { Strategy: JWTStrategy, ExtractJwt } = JWT;

passport.use(
	'signUp',
	new Strategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			try {
				const user = await userModel.create({ name: req.body.name, email, password });
				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

passport.use(
	'signIn',
	new Strategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			try {
				const user = await userModel.findOne({ email });
				if (!user) return done(null, false);

				const isMatch = await user.matchPassword(password);
				if (!isMatch) return done(null, false);

				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

passport.use(
	new JWTStrategy(
		{
			secretOrKey: process.env.JWT_SECRET,
			jwtFromRequest: ExtractJwt.fromHeader('xauthorization'),
		},
		async (xauthorization, done) => {
			try {
				return done(null, xauthorization._id);
			} catch (error) {
				return done(error);
			}
		}
	)
);

export default passport;
