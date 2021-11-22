import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId; // objet permetant de vérifier que l'id passé en paramètre est bien un ID correspondant à mongoose (méthode isValid)

export const changePassword = async (req, res) => {
	if (!ObjectId.isValid(req.user)) return res.status(400).send('Id invalide');

	const { oldPassword, newPassword } = req.body;
	try {
		const user = await userModel.findById(req.user);

		if (!user) {
			return res.status(404).send('User not found');
		}
		const isMatch = await user.isValidPassword(oldPassword);
		if (!isMatch) {
			return res.status(400).send('Mot de passe incorrect');
		}
		user.password = newPassword;
		await user.save();
		res.status(200).send('Mot de passe modifié');
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const changeBio = async (req, res) => {
	if (!ObjectId.isValid(req.user)) return res.status(400).send('Id invalide');

	const { bio } = req.body;
	try {
		const user = await userModel.findById(req.user);

		if (!user) {
			return res.status(404).send('User not found');
		}
		user.bio = bio;
		await user.save();
		res.status(200).send('Bio modifiée');
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const deleteUser = async (req, res) => {
	if (!ObjectId.isValid(req.user)) return res.status(400).send('Id invalide');

	try {
		const user = await userModel.findByIdAndDelete(req.user);
		if (!user) {
			return res.status(404).send('Utilisateur non trouvé');
		}
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
