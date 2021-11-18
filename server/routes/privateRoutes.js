import express from 'express';

const router = express.Router();

router.get('/secret', (req, res) => {
	res.json({
		message: "C'est un message secret.",
		user: req.user,
		token: req.query.token, //on récupère le token de auth
	});
});

export default router;
