// On importe la bibliothèque dotenv afin de charger les variables d'environnement
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
const app = express();
app.use(session({ secret: 'cats', resave: true, saveUninitialized: true }));

import cors from 'cors';

import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

import './middleware/auth.js';
import './middleware/googleAuth.js';
import passport from 'passport';

const appPort = process.env.APP_PORT || 3500;

const start = async () => {
	try {
		// On se connecte à la base de données
		await connectDB();
		app.listen(appPort, () => console.log(`Server is listening on port ${appPort}...`));
	} catch (error) {
		// Si une erreur est survenue, on l'affiche dans la console
		console.log(error);
	}
};

// On démarre l'application NodeJs avec le port 3500
start();

//middlewares
app.use(express.json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
app.get('/', (req, res) => {
	res.send('<a href="/api/v1/auth/google">Authentification avec Google</a>');
});

// Routes
// On définit les routes de l'application
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
