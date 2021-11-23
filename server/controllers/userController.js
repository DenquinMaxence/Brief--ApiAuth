import userModel from '../models/userModel.js';
import mongoose from 'mongoose';
// Objet permetant de vérifier que l'id passé en paramètre est bien un ID correspondant à mongoose (méthode isValid)
const ObjectId = mongoose.Types.ObjectId;
import { StatusCodes } from 'http-status-codes';
import { promises } from 'fs'; //permet de gérer les modifs, déplacements, etc.. des fichiers
import path from 'path';
const __dirname = path.resolve();

export const uploadAvatar = async (req, res) => {
	if (!ObjectId.isValid(req.user))
		return res.status(StatusCodes.BAD_REQUEST).send(`Invalid parameter : ${req.user}`);

	if (!req.file) return res.status(StatusCodes.BAD_REQUEST).send('No file uploaded');

	const { filename } = req.file;

	try {
		const user = await userModel.findById(req.user);
		if (!user) return res.status(StatusCodes.NOT_FOUND).send('User not found');

		if (user.picture && user.picture !== 'random-user.png')
			await promises.unlink(`${__dirname}/../client/public/uploads/profile/${user.picture}`);

		user.picture = filename;
		await user.save();

		res.status(StatusCodes.OK).send({ filename });
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const updateUser = async (req, res) => {
	if (!ObjectId.isValid(req.user))
		return res.status(StatusCodes.BAD_REQUEST).send(`Invalid parameter : ${req.user}`);

	const { name, bio } = req.body;
	try {
		const user = await userModel.findById(req.user);
		if (!user) return res.status(StatusCodes.NOT_FOUND).send('User not found');

		if (name || (typeof name === 'string' && name === '')) user.name = name;
		if (bio || (typeof bio === 'string' && bio === '')) user.bio = bio;

		await user.save();
		res.status(StatusCodes.OK).send(user);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const changePassword = async (req, res) => {
	if (!ObjectId.isValid(req.user))
		return res.status(StatusCodes.BAD_REQUEST).send(`Invalid parameter : ${req.user}`);

	const { oldPassword, newPassword } = req.body;

	try {
		const user = await userModel.findById(req.user);
		if (!user) return res.status(StatusCodes.NOT_FOUND).send('User not found');

		const isMatch = await user.isValidPassword(oldPassword);
		if (!isMatch) return res.status(StatusCodes.BAD_REQUEST).send('Old password is incorrect');

		user.password = newPassword;
		await user.save();

		res.status(StatusCodes.OK).send('Password changed successfully');
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const deleteUser = async (req, res) => {
	if (!ObjectId.isValid(req.user))
		return res.status(StatusCodes.BAD_REQUEST).send(`Invalid parameter : ${req.user}`);

	try {
		const user = await userModel.findByIdAndDelete(req.user);
		if (!user) return res.status(StatusCodes.NOT_FOUND).send('User not found');

		if (user.picture && user.picture !== 'random-user.png')
			await promises.unlink(`${__dirname}/../client/public/uploads/profile/${user.picture}`);

		res.status(StatusCodes.NO_CONTENT).send();
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};
