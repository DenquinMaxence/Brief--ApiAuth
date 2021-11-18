export const catchErrors = (fn) => (req, res, next) => {
	return fn(req, res, next).catch(next); //fonction qui permet de récupérer erreur si erreur il y a
};
