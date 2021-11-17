// On importe la bibliothèque (package) mongoose
import { connect } from 'mongoose';

// Fonction connectDB permettant de connecter notre application à la base de données
const connectDB = () => {
	return connect(process.env.MONGO_URI);
};

// Export de la fonction connectDB
export default connectDB;
