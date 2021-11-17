// On importe la bibliothèque dotenv afin de charger les variables d'environnement
require('dotenv').config();

import express from 'express';
const app = express();
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';

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

// Routes
// On définit les routes de l'application
app.use('/api/v1/users', userRoutes);
