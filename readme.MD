# Brief Api-Auth

Développer par Simon Libert & Maxence Denquin, apprenants chez Simplon.co

## Installation

Cloner le projet :
```bash
git clone https://github.com/DenquinMaxence/Brief--ApiAuth.git
```

Se déplacer dans le dossier du projet :
```bash
cd ./Brief--ApiAuth/
```

Se déplacer dans le dossier `server` :
```bash
cd ./server/
```

### !!! Attention !!! Ce projet requiert la version 16.13.0 de NodeJs
```bash
Lien disponible ici : https://nodejs.org/dist/v16.13.0/node-v16.13.0-x64.msi
```

Installer les dépendances du projet :
```bash
npm install
```

Crée un fichier `.env` à la racine du dossier `server` et y mettre le contenu suivant :
```.env
# On définit la variable d'environnement APP_PORT qui sera utilisée par le serveur
APP_PORT = 3500

# Secret JWT Key & Lifetime
JWT_SECRET = "sMeIP3XTZNOaxVMuQ2xmGs35ET4lW7QWvnxVR8NHzquORZ82"
# JWT LIFETIME of <time> hours in milliseconds
JWT_LIFETIME = 259200000

# SALT for password hashing
SALT = 10

# Database connection configs
# On définit la variable d'environnement MONGO_URI qui sera utilisée pour se connecter à la base de données
MONGO_URI = "mongodb+srv://klairyny:oFm1wBWEZ5EcJTpi@briefapijwt.pqmeh.mongodb.net/ApiAuth?retryWrites=true&w=majority"

# Google Auth Configs
GOOGLE_CLIENT_ID = "domain-name.com"
GOOGLE_CLIENT_SECRET = "SECRET_KEY"
```

## Utilisation

### Lancer l'application NodeJs (Api) :

Lancer en mode de développement :
```bash
npm run dev
```
Lancer en mode de production :
```bash
npm run prod
```

### Lancer l'application Front-End (HTML, CSS, JS)

Si vous disposez de l'extension Live Server, rendez-vous dans le fichier `index.html` du dossier `client`.
Cliquez ensuite sur le bouton `Go Live` en bas à droite de Visual Studio Code.

Vérifier que l'URL navigateur correspond à `http://127.0.0.1:5500/client/index.html`