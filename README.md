# Eyes On The City API

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

DB_URI=mongodb://localhost:27017/nom_de_la_base_de_donnees

TOKEN_SECRET_KEY= (Chaîne de caractère aléatoire)
```

5. Vous devez avoir mongodb installé sur votre machine et il doit tourner sur le port 27017.

## Utilisation

1. Démarrez le serveur :

```bash
npm start
```

2. L'API sera disponible à l'adresse : `http://localhost:3000`

## Documentation des routes

### Authentification

Ce document décrit les différentes routes d'authentification disponibles dans le projet.

#### Enregistrement d'un citoyen

Permet à un citoyen de s'inscrire dans le système.

- **URL** : `/auth/register`
- **Méthode** : `POST`
- **Paramètres du body** :
  - `lastName` (string, obligatoire) : Nom de famille.
  - `firstName` (string, obligatoire) : Prénom.
  - `email` (string, obligatoire) : Adresse e-mail.
  - `phone` (string, obligatoire) : Numéro de téléphone.
  - `address` (string, facultatif) : Adresse.
  - `password` (string, obligatoire) : Mot de passe (doit contenir au moins 8 caractères alphanumériques).
- **Réponses** :
  - `201 Created` : Enregistrement réussi.
  - `400 Bad Request` : Erreur de validation des données.
  - `500 Internal Server Error` : Erreur interne du serveur.

#### Connexion d'un citoyen

Permet à un citoyen de se connecter au système.

- **URL** : `/auth/login`
- **Méthode** : `POST`
- **Paramètres du body** :
  - `identifier` (string, obligatoire) : Identifiant (e-mail ou numéro de téléphone).
  - `password` (string, obligatoire) : Mot de passe.
- **Réponses** :
  - `200 OK` : Connexion réussie. Retourne l'utilisateur et un jeton d'authentification en plus du jeton de rafraîchissement.
  - `400 Bad Request` : Erreur de validation des données.
  - `401 Unauthorized` : Identifiants invalides.
  - `500 Internal Server Error` : Erreur interne du serveur.

#### Connexion d'un administrateur

Permet à un administrateur de se connecter au système.

- **URL** : `/auth/admin/login`
- **Méthode** : `POST`
- **Paramètres du corps** :
  - `identifier` (string, obligatoire) : Identifiant (e-mail ou numéro de téléphone).
  - `password` (string, obligatoire) : Mot de passe.
- **Réponses** :
  - `200 OK` : Connexion réussie. Retourne l'utilisateur et un jeton d'authentification en plus du jeton de rafraîchissement.
  - `400 Bad Request` : Erreur de validation des données.
  - `401 Unauthorized` : Identifiants invalides.
  - `500 Internal Server Error` : Erreur interne du serveur.

#### Rafraîchissement du token

Rafraîchissement du token d'authorisation

- **URL** : `/auth/refreshToken`
- **Méthode** : `POST`
- **Réponses** :
  - `200 OK` : Rafraîchissement réussi. Retourne un jeton d'authentification et un jeton de rafraîchissement.
  - `400 Bad Request` : Token de refraîchissement invalide.
  - `401 Unauthorized` : Aucun token de rafraîchissement fourni.
  - `500 Internal Server Error` : Erreur interne du serveur.

### Utilisateurs

#### Récupérer tous les utilisateurs

Permet de récupérer tous les utilisateurs inscrits sur la plateforme.

- **URL** : `/user/index`
- **Méthode** : `GET`
- **En-tête requis** :
  - `Authorization-Token` : Jeton d'authentification valide.
  - `Refresh-Token` : Jeton de rafraîchissement valide.
- **Réponses** :
  - `200 OK` : Utilisateurs récupérés avec succès.
  - `401 Unauthorized` : Jeton d'authentification invalide ou manquant.
  - `500 Internal Server Error` : Erreur interne du serveur.

#### Obtenir les informations d'un utilisateur

Permet de récupérer les informations liées à l'utilisateur.

- **URL** : `/user/infos/:userId`
- **Méthode** : `GET`
- **Paramètres de l'URL** :
  - `userId` (string, obligatoire) : Identifiant de l'utilisateur.
- **En-tête requis** :
  - `Authorization-Token` : Jeton d'authentification valide.
  - `Refresh-Token` : Jeton de rafraîchissement valide.
- **Réponses** :
  - `200 OK` : Informations de l'utilisateur récupérées avec succès.
  - `401 Unauthorized` : Jeton d'authentification invalide ou manquant.
  - `500 Internal Server Error` : Erreur interne du serveur.

#### Changer le mot de passe

Permet à un utilisateur connecté de changer son propre mot de passe.

- **URL** : `/user/changePassword`
- **Méthode** : `POST`
- **Paramètres du corps** :
  - `newPassword` (string, obligatoire) : Nouveau mot de passe.
  - `oldPassword` (string, obligatoire) : Ancien mot de passe.
- **En-tête requis** :
  - `Authorization-Token` : Jeton d'authentification valide.
  - `Refresh-Token` : Jeton de rafraîchissement valide.
- **Réponses** :
  - `200 OK` : Mot de passe modifié avec succès.
  - `400 Bad Request` : Erreur de validation des données.
  - `401 Unauthorized` : Jeton d'authentification invalide ou manquant.
  - `500 Internal Server Error` : Erreur interne du serveur.

#### Mise à jour d'un utilisateur

Permet à un utilisateur connecté de modifier ses informations.

- **URL** : `/user/update`
- **Méthode** : `POST`
- **Paramètres du corps** :
  - `firstName` (string, facultatif) : Prénom.
  - `lastName` (string, facultatif) : Nom.
  - `email` (string, facultatif) : Email.
  - `phone` (number, facultatif) : Numéro de téléphone.
  - `address` (string, facultatif) : Addresse.
- **En-tête requis** :
  - `Authorization-Token` : Jeton d'authentification valide.
  - `Refresh-Token` : Jeton de rafraîchissement valide.
- **Réponses** :
  - `200 OK` : Utilisateur modifié avec succès.
  - `400 Bad Request` : Erreur de validation des données.
  - `401 Unauthorized` : Jeton d'authentification invalide ou manquant.
  - `500 Internal Server Error` : Erreur interne du serveur.

### Centres de suport

### Incidents

#### Signalement d'un incident

Permet de signaler un nouvel incident.

- **URL** : `/incidents/report`
- **Méthode** : `POST`
- **Paramètres du corps** :
  - `description` (string, facultatif) : Texte descriptif de l'incident.
  - `troubles` (array of string, obligatoire) : Liste des identifiants des troubles associés à l'incident.
  - `latitude` (number, obligatoire) : Latitude de l'incident.
  - `longitude` (number, obligatoire) : Longitude de l'incident.
  - `audio` (audio, obligatoire) : Audio descriptif de l'incident.
  - `picture` (image, facultatif) : Photo de l'incident.
  - `video` (video, facultatif) : Vidéo de l'incident.
- **En-tête requis** :
  - `Authorization-Token` : Jeton d'authentification valide.
  - `Refresh-Token` : Jeton de rafraîchissement valide.
- **Réponses** :
  - `201 Created` : Incident signalé avec succès.
  - `400 Bad Request` : Erreur de validation des données.
  - `401 Unauthorized` : Jeton d'authentification invalide ou manquant.
  - `500 Internal Server Error` : Erreur interne du serveur.

#### Modification d'un incident

Permet de modifier un incident.

- **URL** : `/incidents/update/:incidentId`
- **Méthode** : `POST`
- **Paramètres de l'URL** :
  - `incidentId` (string, obligatoire) : Identifiant de l'incident à modifier.
- **Paramètres du corps** :
  - `description` (string, facultatif) : Description de l'incident.
  - `troubles` (array, facultatif) : Liste des problèmes associés à l'incident.
  - `latitude` (number, facultatif) : Latitude de l'incident.
  - `longitude` (number, facultatif) : Longitude de l'incident.
  - `picture` (picture, facultatif) : Image de l'incident.
  - `video` (video, facultatif) : Vidéo de l'incident.
  - `audio` (audio, facultatif) : Audio descriptif de l'incident.
- **En-tête requis** :
  - `Authorization-Token` : Jeton d'authentification valide.
  - `Refresh-Token` : Jeton de rafraîchissement valide.
- **Réponses** :
  - `200 OK` : Incident modifié avec succès.
  - `400 Bad Request` : Erreur de validation des données.
  - `401 Unauthorized` : Jeton d'authentification invalide ou manquant.
  - `500 Internal Server Error` : Erreur interne du serveur.

#### Obtenir les détails d'un incident

Permet d'obtenir les détails d'un incident.

- **URL** : `/incidents/:incidentId`
- **Méthode** : `GET`
- **Paramètres de l'URL** :
  - `incidentId` (string, obligatoire) : Identifiant de l'incident.
- **En-tête requis** :
  - `Authorization-Token` : Jeton d'authentification valide.
  - `Refresh-Token` : Jeton de rafraîchissement valide.
- **Réponses** :
  - `200 OK` : Détails de l'incident récupérés avec succès.
  - `401 Unauthorized` : Jeton d'authentification invalide ou manquant.
  - `500 Internal Server Error` : Erreur interne du serveur.

#### Traitement d'un incident

Permet à un centre de support d'accepter ou décliner la prise en charge d'un incident existant.

- **URL** : `/incidents/handle/:incidentId`
- **Méthode** : `POST`
- **Paramètres de l'URL** :
  - `incidentId` (string, obligatoire) : Identifiant de l'incident à traiter.
- **Paramètres du corps** :
  - `isHandled` (boolean, obligatoire) : Indique si l'incident sera traité ou non.
- **En-tête requis** :
  - `Authorization-Token` : Jeton d'authentification valide.
  - `Refresh-Token` : Jeton de rafraîchissement valide.
- **Réponses** :
  - `200 OK` : Incident traité ou décliné avec succès.
  - `400 Bad Request` : Erreur de validation des données.
  - `401 Unauthorized` : Jeton d'authentification invalide ou manquant.
  - `500 Internal Server Error` : Erreur interne du serveur.

#### Obtenir les incidents d'un centre de support

Permet à un centre de support d'obtenir les incidents qui lui sont associés.

- **URL** : `/incidents/supportCenter/:supportCenterId`
- **Méthode** : `GET`
- **Paramètres de l'URL** :
  - `supportCenterId` (string, obligatoire) : Identifiant du centre de support pour lequel obtenir les incidents.
- **En-tête requis** :
  - `Authorization-Token` : Jeton d'authentification valide.
  - `Refresh-Token` : Jeton de rafraîchissement valide.
- **Réponses** :
  - `200 OK` : Liste des incidents du centre de support récupérée avec succès.
  - `401 Unauthorized` : Jeton d'authentification invalide ou manquant.
  - `500 Internal Server Error` : Erreur interne du serveur.

#### Obtenir les incidents signalés par un utilisateur

Permet d'obtenir les incidents associés à un utilisateur spécifique.

- **URL** : `/incidents/user/:userId`
- **Méthode** : `GET`
- **Paramètres de l'URL** :
  - `userId` (string, obligatoire) : Identifiant de l'utilisateur.
- **En-tête requis** :
  - `Authorization-Token` : Jeton d'authentification valide.
  - `Refresh-Token` : Jeton de rafraîchissement valide.
- **Réponses** :
  - `200 OK` : Liste des incidents signalés récupérée avec succès.
  - `401 Unauthorized` : Jeton d'authentification invalide ou manquant.
  - `500 Internal Server Error` : Erreur interne du serveur.

### Troubles

#### Obtenir les troubles

Permet de récupérer toutes les catégories d'incident possibles.

- **URL** : `/troubles/index`
- **Méthode** : `GET`
- **En-tête requis** :
  - `Authorization-Token` : Jeton d'authentification valide.
  - `Refresh-Token` : Jeton de rafraîchissement valide.
- **Réponses** :
  - `200 OK` : Liste des catégories d'incident récupérée avec succès.
  - `401 Unauthorized` : Jeton d'authentification invalide ou manquant.
  - `500 Internal Server Error` : Erreur interne du serveur.

### Centres de suport

#### Obtenir le centre de support actuellement connecté 

Permet de récupérer le centre de support actuellement connecté au dashboard admin.

- **URL** : `/supportCenter/connected`
- **Méthode** : `GET`
- **En-tête requis** :
  - `Authorization-Token` : Jeton d'authentification valide.
  - `Refresh-Token` : Jeton de rafraîchissement valide.
- **Réponses** :
  - `200 OK` : Centre de support connecté récupéré avec succès.
  - `401 Unauthorized` : Jeton d'authentification invalide ou manquant.
  - `500 Internal Server Error` : Erreur interne du serveur.

#### Obtenir tous les centres de support

Permet de récupérer tous les centres de support actuellement enregistrés dans la base.

- **URL** : `/supportCenter/index`
- **Méthode** : `GET`
- **En-tête requis** :
  - `Authorization-Token` : Jeton d'authentification valide.
  - `Refresh-Token` : Jeton de rafraîchissement valide.
- **Réponses** :
  - `200 OK` : Centres de support récupérés avec succès.
  - `401 Unauthorized` : Jeton d'authentification invalide ou manquant.
  - `500 Internal Server Error` : Erreur interne du serveur.