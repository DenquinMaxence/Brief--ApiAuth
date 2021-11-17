// On importe la bibliothèque express
import { Router } from 'express';
const router = Router();
// On importe le userController permettant de communiquer avec la base de données
import { getAllUsers } from '../controllers/userController';

// On définit le chemin de la route
router.get('/', getAllUsers);

// On exporte le router
export default router;
