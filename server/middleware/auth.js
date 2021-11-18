import dotenv from 'dotenv';
dotenv.config();

import passport from 'passport';
import { Strategy } from 'passport-local';

import userModel from '../models/userModel.js';

import JWT from 'passport-jwt';
const { Strategy: JWTStrategy, ExtractJwt } = JWT;

passport.use(
	'signup',
	new Strategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			try {
				const user = await userModel.create({ email, password });
				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

passport.use(
	'login',
	new Strategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			try {
				const user = await userModel.findOne({ email });
				if (!user) {
					return done(null, false, { message: 'Utilisateur non trouvé.' });
				}

				const validate = await user.isValidPassword(password);
				if (!validate) {
					return done(null, false, { message: 'Erreur de connexion.' });
				}
				return done(null, user, { message: 'Connexion réussie.' });
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
			jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
		},
		async (token, done) => {
			try {
				return done(null, token.user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

export default passport;
