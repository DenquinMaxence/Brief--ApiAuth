import mongoose from 'mongoose';
// Objet permetant de vérifier que l'id passé en paramètre est bien un ID correspondant à mongoose (méthode isValid)
const ObjectId = mongoose.Types.ObjectId;
import { StatusCodes } from 'http-status-codes';
import fs from 'fs'; //permet de gérer les modifs, déplacements, etc.. des fichiers
import { promisify } from 'util'; // supporte les besoins de nodeJS pour gérer les err rapport à l'image
import stream from 'stream';
const pipeline = promisify(stream.pipeline);

export const changePassword = async (req, res) => {
	if (!ObjectId.isValid(req.user))
		return res.status(StatusCodes.BAD_REQUEST).send(`Invalid parameter : ${req.user}`);

	const { oldPassword, newPassword } = req.body;
	try {
		const user = await userModel.findById(req.user);
		if (!user) return res.status(StatusCodes.NOT_FOUND).send('Utilsateur introuvable');

		const isMatch = await user.isValidPassword(oldPassword);
		if (!isMatch) return res.status(StatusCodes.BAD_REQUEST).send('Mot de passe incorrect');

		user.password = newPassword;
		await user.save();
		res.status(StatusCodes.OK).send('Mot de passe modifié');
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const changeBio = async (req, res) => {
	if (!ObjectId.isValid(req.user))
		return res.status(StatusCodes.BAD_REQUEST).send(`Invalid parameter : ${req.user}`);

	const { bio } = req.body;
	try {
		const user = await userModel.findById(req.user);
		if (!user) return res.status(StatusCodes.NOT_FOUND).send('User not found');

		user.bio = bio;
		await user.save();
		res.status(StatusCodes.OK).send('Bio modifiée');
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const deleteUser = async (req, res) => {
	if (!ObjectId.isValid(req.user))
		return res.status(StatusCodes.BAD_REQUEST).send(`Invalid parameter : ${req.user}`);

	try {
		const user = await userModel.findByIdAndDelete(req.user);
		if (!user) return res.status(StatusCodes.NOT_FOUND).send('Utilisateur non trouvé');

		res.status(StatusCodes.NO_CONTENT).send();
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export const uploadAvatar = async (req, res) => {
	if (!ObjectId.isValid(req.user))
		return res.status(StatusCodes.BAD_REQUEST).send(`Invalid parameter : ${req.user}`);
	try {
		const { detectedMimeType, size, stream } = req.file;
		if (
			detectedMimeType !== 'image/jpeg' &&
			detectedMimeType !== 'image/png' &&
			detectedMimeType !== 'image/jpg'
		)
			return res.status(StatusCodes.BAD_REQUEST).send("Le fichier n'est pas une image");

		if (size > 500000)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.send("L'image est trop lourde, un peu comme toi.");
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).send(error.message);
	}

	try {
		const user = await userModel.findById(req.user);
		if (!user) return res.status(StatusCodes.NOT_FOUND).send('Utilisateur introuvable');
		const fileName = user.name + '.jpg';
		await pipeline(
			stream,
			fs.createWriteStream(`${__dirname}/../../client/public/uploads/profile/${fileName}`)
		);

		user.avatar = `./uploads/profile/${fileName}`;
		await user.save();
		res.status(StatusCodes.OK).send('Avatar modifié');
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};
