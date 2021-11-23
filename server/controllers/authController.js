import jwt from 'jsonwebtoken';
import passport from 'passport';
import { StatusCodes } from 'http-status-codes';
import userModel from '../models/userModel.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// Register
export const signUp = (req, res) => {
	res.status(StatusCodes.CREATED).send({ user: req.user });
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

				res.send(token);
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
};

export const getMe = async (req, res) => {
	if (!ObjectId.isValid(req.user))
		return res.status(StatusCodes.BAD_REQUEST).send(`Invalid parameter : ${req.user}`);

	try {
		const user = await userModel.findById(req.user).select('-password -__v');
		if (!user) return res.status(StatusCodes.BAD_REQUEST).send('User not found');
		res.status(StatusCodes.OK).send(user);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const signOut = (req, res) => {
	req.logout();
	res.status(StatusCodes.OK).send();
};
