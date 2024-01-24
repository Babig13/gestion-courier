# SiteGestionCourrier

Ce projet est une application web React conçue pour gérer les connexions et les inscriptions des utilisateurs, avec des fonctionnalités spécifiques pour les administrateurs et les utilisateurs normaux. Il interagit avec un backend spécifique pour la gestion des utilisateurs et des rôles.

## Fonctionnalités

- **Connexion et Inscription :**

  - Les utilisateurs peuvent se connecter et s'inscrire via des formulaires dédiés.
  - La page d'inscription permet l'admin de créer un nouveau compte en fournissant des informations telles que le nom de l'entreprise, le prénom, le nom, l'email, le téléphone et un statut d'administrateur.
  - La page de connexion permet aux utilisateurs de se connecter en utilisant leur nom d'entreprise et un code à quatre chiffres.

- **Redirection Basée sur le Rôle :**

  - Après la connexion, les utilisateurs sont redirigés vers des tableaux de bord spécifiques en fonction de leur rôle (administrateur ou utilisateur).
  - Les administrateurs accèdent à un tableau de bord administrateur (`AdminDashboard`) où ils peuvent gérer les utilisateurs et d'autres fonctionnalités administratives.
  - Les utilisateurs sont redirigés vers un tableau de bord utilisateur (`UserDashboard`) où ils peuvent accéder à leurs informations personnelles et autres fonctionnalités utilisateur.

- **Gestion des Utilisateurs :**
  - Les informations des utilisateurs sont gérées via une API backend (`GestionCourrier`), qui permet de créer, lire, mettre à jour et supprimer des utilisateurs.

## Frontend

Le projet utilise les dépendances suivantes :

- `React.js` : La bibliothèque JavaScript pour la construction d'interfaces utilisateur.
- `React Router` : Pour la gestion de la navigation au sein de l'application.
- `Evergreen Ui` : Pour l'intégrations de composants dynamique.

Les pages principales de notre application sont :

- `Login` : Permet aux utilisateurs de se connecter en utilisant leur nom d'entreprise et un code à quatre chiffres.
- `Admin` : Réservé aux administrateurs pour gérer les utilisateurs.
- `CreateUser/EditUser` : Formulaire permettant à l'administrateur de créer, éditer ou supprimer un utilisateur.
- `User` : Pour les utilisateurs, où ils peuvent accéder à leurs informations personnelles.

## Backend

Le projet interagit avec un backend développé séparément, disponible ici : [GestionCourrier Backend](https://github.com/James-TREMA/GestionCourrier). Ce backend est responsable de la gestion des utilisateurs, de l'authentification et de la fourniture des données nécessaires au fonctionnement de l'application frontend.

## Technologies Utilisées

- **Frontend :**

  - React.js
  - React Router pour la navigation
  - Fetch API pour les requêtes HTTP

- **Backend :**
  - Node.js avec Express pour le serveur
  - MongoDB pour la base de données (gestionnée par l'API `GestionCourrier`)

## Auteur SiteGestionCourrier & GestionCourrier
