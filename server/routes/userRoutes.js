// On importe la bibliothèque express
import { Router } from 'express';
import passport from 'passport';
import { catchErrors } from '../helpers.js';
import { signIn } from '../controllers/userController.js';

const router = Router();
// On importe le userController permettant de communiquer avec la base de données

// On définit le chemin de la route
/* router.post('/register', catchErrors(signUp)); */

router.post('/login', catchErrors(signIn));

// Authentification

router.post(
	'/register',
	passport.authenticate('register', { session: false }),
	async (req, res, next) => {
		res.json({
			message: 'Votre identifiant a bien été créé.',
			user: req.user,
		});
	}
);

// On exporte le router
export default router;
