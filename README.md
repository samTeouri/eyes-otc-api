# Quiz API

Une API TypeScript/Node.js pour un jeu de quiz utilisant MongoDB comme base de données.

## Installation

1. Clonez le dépôt GitHub :

```bash
git clone https://github.com/samTeouri/eyes-otc-api.git
```

2. Accédez au répertoire du projet :

```bash
cd eyes-otc-api
```


3. Installez les dépendances :

```bash
npm install
```

4. Créez un fichier `.env` à la racine du projet et configurez les variables d'environnement suivantes :

```txt
PORT=3000

DB_HOST=localhost
DB_DIALECT= (postgres | mysql)
DB_NAME=
DB_USERNAME=
DB_PASSWORD= 

TOKEN_SECRET_KEY= (Chaîne de caractère aléatoire)
```

## Utilisation

1. Démarrez le serveur en mode développement :

```bash
npm start
```

2. L'API sera disponible à l'adresse : `http://localhost:3000`

## Documentation des routes

### Citoyen Login

- **URL** : `/questions`
- **Méthode HTTP** : `POST`
- **Paramètres du corps** : 
  - `statement` (string) : Énoncé de la question
  - `answers` (string[]) : Tableau des réponses possibles
  - `correctAnswer` (string) : Réponse correcte
- **Réponses** :
  - 201 : Question ajoutée avec succès
  - 400 : Erreur de validation des données

### Vérifier une réponse

- **URL** : `/questions/:id/check`
- **Méthode HTTP** : `POST`
- **Paramètres de l'URL** : 
  - `id` : Identifiant de la question
- **Paramètres du corps** : 
  - `answer` (string) : Réponse à vérifier
- **Réponses** :
  - 200 : Réponse correcte ou incorrecte
  - 400 : Erreur de validation des données
  - 404 : Question non trouvée

### Obtenir une question aléatoire

- **URL** : `/questions/random`
- **Méthode HTTP** : `GET`
- **Réponses** :
  - 200 : Succès avec la question aléatoire
  - 500 : Erreur serveur
