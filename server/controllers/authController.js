import jwt from 'jsonwebtoken';
import passport from 'passport';
import userModel from '../models/userModel.js';

// Register
export const signUp = async (req, res, next) => {
	res.status(201).json({
		message: 'Votre identifiant a bien été créé.',
		user: req.user,
	});
};

// login
export const signIn = (req, res, next) => {
	passport.authenticate('signIn', async (err, user) => {
		try {
			if (err || !user) {
				const error = new Error('Une erreur est survenue.');
				return next(error);
			}
			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);

				const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

				res.json({ token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
};

export const getMe = async (req, res) => {
	try {
		const user = await userModel.findById(req.user).select('-password -__v');
		res.status(200).send(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
