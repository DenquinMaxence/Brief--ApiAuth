// On importe le userModel afin de pouvoir communiqué avec le document User dans la base de données
import userModel from '../models/userModel.js';

// Export du module userController et ses fonctions.
// Register
/* export const signUp = async (req, res) => {
	const user = await userModel.create({ ...req.body });
	res.status(201).send(user);
}; */
// login
export const signIn = async (req, res) => {
	const user = await userModel.find({ _id: req.params.id });
	res.send(user);
};

//update
/* export const updateUser = async (req, res) => {
	const user = await findByIdAndUpdate(req.params.id, req.body);
	await user.save();
	res.send(user);
}; */
