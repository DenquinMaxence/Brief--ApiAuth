// On importe la bibliothèque express
import { Router } from 'express';
import passport from 'passport';
import { signUp, signIn, getMe } from '../controllers/authController.js';
const router = Router();

// Register
// http://localhost:3500/api/v1/auth/signup
router.post('/register', passport.authenticate('signUp', { session: false }), signUp);

// Login
// http://localhost:3500/api/v1/auth/login
router.post('/login', signIn);

// LOGOUT ROUTER
router.get('/logout', (req, res) => {
	req.logout();
	res.status(200).send();
});

// http://localhost:3500/api/v1/auth/me
router.get('/me', passport.authenticate('jwt', { session: false }), getMe);

// http://localhost:3500/api/v1/auth/google
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// On exporte le router
export default router;
