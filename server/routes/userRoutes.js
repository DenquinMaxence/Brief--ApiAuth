import { Router } from 'express';
const router = Router();
import passport from 'passport';
import {
	uploadAvatar,
	updateUser,
	changePassword,
	deleteUser,
} from '../controllers/userController.js';

import path from 'path';
const __dirname = path.resolve();

import multer from 'multer';
const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, `${__dirname}/../client/public/uploads/profile`);
		},
		filename: function (req, file, cb) {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
			cb(null, `${uniqueSuffix}-${file.originalname}`);
		},
	}),
	upload = multer({
		storage,
		limits: { fileSize: 500000 },
		fileFilter: function (req, file, cb) {
			const { mimetype } = file;
			if (mimetype !== 'image/png' && mimetype !== 'image/jpg' && mimetype !== 'image/jpeg')
				return cb(null, false);

			cb(null, true);
		},
	});

router.post('/change-password', passport.authenticate('jwt', { session: false }), changePassword);

router.post(
	'/upload',
	passport.authenticate('jwt', { session: false }),
	upload.single('upload_avatar'),
	uploadAvatar
);

router
	.put('/', passport.authenticate('jwt', { session: false }), updateUser)
	.delete('/', passport.authenticate('jwt', { session: false }), deleteUser);

export default router;
