import { Router } from 'express';
import passport from 'passport';
import { changePassword, deleteUser } from '../controllers/userController.js';
const router = Router();

router.post('/change-password', passport.authenticate('jwt', { session: false }), changePassword);

router.delete('/', passport.authenticate('jwt', { session: false }), deleteUser);

export default router;
