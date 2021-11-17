import passport from 'passport';
import { Strategy } from 'passport-local';

import userModel from '../models/userModel.js';

passport.use(
	'/register',
	new Strategy(
		{
			usernameField: 'name',
			emailField: 'email',
			passwordField: 'password',
		},
		async (email, password, name, done) => {
			try {
				const user = userModel.create({ email, password, name });
				return done(null, user);
			} catch (error) {
				done(error);
			}
		}
	)
);

export default passport;
