import { Router } from 'express';
import passport from 'passport';

import multer from 'multer';
const upload = multer();

import { changePassword, deleteUser, uploadAvatar } from '../controllers/userController.js';
const router = Router();

router.post('/change-password', passport.authenticate('jwt', { session: false }), changePassword);

router.delete('/', passport.authenticate('jwt', { session: false }), deleteUser);

router.post(
	'/avatar',
	upload.single('upload_avatar'),
	passport.authenticate('jwt', { session: false }),
	uploadAvatar
);

export default router;
