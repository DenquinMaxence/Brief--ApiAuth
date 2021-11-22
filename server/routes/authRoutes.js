// On importe la bibliothèque express
import { application, Router } from 'express';
import session from 'express-session';
import passport from 'passport';
import { signUp, signIn, getMe } from '../controllers/authController.js';
const router = Router();

function isLoggedIn(req, res, next) {
	req.user ? next() : res.sendStatus(401);
}

// Register
// http://localhost:3500/api/v1/auth/signup
router.post('/register', passport.authenticate('signUp', { session: false }), signUp);

// Login
// http://localhost:3500/api/v1/auth/login
router.post('/login', signIn);

// LOGOUT ROUTER
router.get('/logout', isLoggedIn, (req, res) => {
	req.logout();
	res.status(200).send();
});

// http://localhost:3500/api/v1/auth/me
router.get('/me', passport.authenticate('jwt', { session: false }), getMe);

// http://localhost:3500/api/v1/auth/google
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: '/login/success',
		failureRedirect: '/login/failure',
	})
);
router.get('/login/success', isLoggedIn, (req, res) => {
	res.status(200).send();
});

router.get('/login/failure', (req, res) => {
	res.status(400).send();
});

// On exporte le router
export default router;
