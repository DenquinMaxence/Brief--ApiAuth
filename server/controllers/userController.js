import mongoose from 'mongoose';
// Objet permetant de vérifier que l'id passé en paramètre est bien un ID correspondant à mongoose (méthode isValid)
const ObjectId = mongoose.Types.ObjectId;
import { StatusCodes } from 'http-status-codes';

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
