// On importe la bibliothèque (package) mongoose
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// UserSchema représente le squelette du document utilisateur dans la base de données
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Merci de fournir un nom d'utilisateur"],
			minlength: 3,
			maxlength: 50,
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'Merci de fournir un email'],
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Merci de fournir un email valide',
			],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Merci de fournir un mot de passe'],
			minlength: 3,
			maxlength: 255,
		},
		bio: {
			type: String,
			max: 1024,
		},

		avatar: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

//pre hook
userSchema.pre('save', async function (next) {
	//means : avant de save, fais cette fonction
	const hash = await bcrypt.hash(this.password, Number(process.env.SALT));
	this.password = hash;

	next();
});

//Ajouter une méthode pour vérifier le password
userSchema.methods.isValidPassword = async function (password) {
	//methode means : ajouter une méthode (valide password)
	return await bcrypt.compare(password, this.password);
};

// Permet d'exporter le modèle User afin de pouvoir y accèdez dans les autres fichiers
export default mongoose.model('User', userSchema);
