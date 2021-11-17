// On importe le userModel afin de pouvoir communiqué avec le document User dans la base de données
import { find } from '../models/userModel';

// Export du module userController et ses fonctions.
export async function getAllUsers(req, res) {
	// Déclaration de la variable users qui contiendra tous les utilisateurs
	const users = await find();
	// On renvoie la réponse au client
	res.status(200).json({ users });
}
