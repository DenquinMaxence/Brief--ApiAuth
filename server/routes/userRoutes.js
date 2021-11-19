// On importe la bibliothèque express
import { Router } from 'express';
import passport from 'passport';

import jwt from 'jsonwebtoken';

import { catchErrors } from '../helpers.js';
import { signIn } from '../controllers/userController.js';

const router = Router();
// On importe le userController permettant de communiquer avec la base de données

// On définit le chemin de la route
/* router.post('/register', catchErrors(signUp)); */

// router.post('/login', catchErrors(signIn));

// Authentification

router.post(
	'/signup',
	passport.authenticate('signup', { session: false }),
	async (req, res, next) => {
		res.json({
			message: 'Votre identifiant a bien été créé.',
			user: req.user,
		});
	}
);

router.post('/login', (req, res, next) => {
	passport.authenticate('login', async (err, user) => {
		try {
			if (err || !user) {
				const error = new Error('Une erreur est survenue.');
				return next(error);
			}
			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);

				const body = { _id: user._id, email: user.email };
				const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

				res.json({ token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});
// On exporte le router
export default router;
