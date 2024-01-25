//création de la page de connexion

// Import des composants nécessaires depuis Evergreen UI et React
import { Button, Pane, SelectMenu, TextInput } from "evergreen-ui";
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaUnlock, FaLock } from "react-icons/fa6";
import "./login.css"; // Import du fichier CSS pour la page de connexion
import { Navigate, useNavigate } from "react-router-dom";

// Définition du composant de connexion
const Login = () => {
  // États pour gérer les données de l'utilisateur et l'état de connexion
  const [password, setPassword] = useState(""); // Mot de passe
  const [entreprise, setEntreprise] = useState([]); // Liste des entreprises récupérée depuis l'API
  const [selectedCompany, setSelectedCompany] = useState(""); // Entreprise sélectionnée par l'utilisateur
  const [loggedIn, setLoggedIn] = useState(false); // État de connexion
  const [tabselect, settabselect] = useState([]); // Tableau pour stocker les noms des entreprises (utilisé dans Autocomplete)
  const [isAdmin, setIsAdmin] = useState(""); //État pour gérer le statut administrateur
  const navigate = useNavigate(); // Utilisation du hook useNavigate pour la navigation dans l'application
  const [firmName, setFirmName] = useState(""); // État pour stocker le nom de l'entreprise
  const [buttonDisabled, setButtonDisabled] = useState(false); // Nouvel état pour bloquer le bouton
  const [showAlert, setShowAlert] = useState(false); // État pour contrôler l'affichage de l'alerte

  // Vérifier si le bouton de connexion doit être activé
  const isLoginButtonDisabled = !selectedCompany || !password;

  // Fonction appelée lorsqu'un utilisateur tente de se connecter
  const handleLogin = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut

    // Vérifie si les deux champs sont renseignés
    if (!selectedCompany || !password) {
      alert("Veuillez remplir tous les champs.");
      return; // Arrêtez la fonction s'il manque des informations
    }

    // Construction du corps de la requête pour l'identification du client
    const requestBody = {
      firm_name: selectedCompany,
      four_digit_code: password,
    };

    // Désactive le bouton après soumission du formulaire, l'utilisateur ne pourra plus cliquer .
    setButtonDisabled(true);

    // Requête au serveur pour vérifier les identifiants
    fetch(`http://51.83.69.229:3000/api/users/login`, {
      method: "POST", // Méthode POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody), // Convertit l'objet en format JSON
    })
      .then((response) => response.json()) //transforme la réponse HTTP en un objet JavaScript.

      // affiche dans la console les données (objet JavaScript)
      //utilisé à des fins de débogage pour voir les données renvoyées par le serveur.
      .then((data) => {
        console.log(data);

        // Vérification du succès de la connexion
        if (data && data.message === "Identification réussie") {
          // setLoggedIn(true);

          // pour stocker le token ,l'Id et le nom de l'entreprise de l'utilisateur
          //et savoir si l'utilisateur est un administrateur (is_admin).
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("firm_name", data.firm_name);
          localStorage.setItem("is_admin", data.is_admin);

          // Mise à jour de l'état isAdmin avec la valeur de data.is_admin
          setIsAdmin(data.is_admin);
          // Mise à jour de l'état firmName avec la valeur de data.firm_name
          setFirmName(data.firm_name);
          // Affichage dans la console de la valeur actuelle de isAdmin
          console.log(isAdmin);

          // Si l'utilisateur est un administrateur, navigue vers la page "/admin", sinon, navigue vers la page "/user/{firmName}"
          // if (isAdmin === true) {
          if (data.is_admin) {
            navigate("/admin");
          } else {
            const firmName = data.firm_name;
            navigate(`/user/${firmName}`);
          }
        } else {
          alert(
            "Identifiants incorrects, veuillez réessayer dans 10 secondes.\n" +
              // Ajout du  caractère '\n' pour faire un saut de ligne
              "Mot de passe oublié, contactez l'administrateur."
          );

          // Utilisation de setTimeout pour débloquer le bouton après 10 secondes
          setTimeout(() => {
            setButtonDisabled(false);
          }, 10000);
        }
      })
      .catch((error) => console.error(error));
  };

  // Fonction appelée lorsqu'un utilisateur soumet le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Appeler votre fonction de connexion ici
    handleLogin(e);
  };

  // Effet pour charger la liste des entreprises depuis l'API lors du chargement de la page
  useEffect(() => {
    // Requête au serveur pour obtenir la liste des entreprises
    fetch(`http://51.83.69.229:3000/api/users/gestionEntrepriseFirmName`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        //  Vérifier si la réponse est OK
        if (!response.ok) {
          throw new Error("Réponse non valide du serveur");
        }

        // Vérifier le type de contenu de la réponse = content-type

        // Récupère le type de contenu de l'en-tête de la réponse
        const contentType = response.headers.get("content-type");
        // Vérifie si le type de contenu existe et s'il inclut "application/json"
        if (!contentType || !contentType.includes("application/json")) {
          // Lance une erreur si le type de contenu n'est pas au format JSON
          throw new Error("La réponse n'est pas au format JSON");
        }

        //Si l'une de ces conditions n'est pas remplie = "La réponse n'est pas au format JSON".
        //on s'assure que la réponse attendue est au format JSON avant de tenter
        //de la traiter en tant que telle.

        //si la réponse est au format JSON, on Parse(convertit) la réponse en JSON
        return response.json();
      })

      .then((data) => {
        // Log de la réponse brute pour le débogage

        console.log(data);

        // Vérification du succès de la récupération des entreprises
        if (data.firmNames && data.firmNames.length > 0) {
          setEntreprise(data.firmNames);

          //Création d'un tableau contenant les noms des entreprises
          const tab = data.firmNames.map((el) => el.firm_name);
          // Mise à jour de l'état du tableau des noms d'entreprises
          settabselect(tab);
        } else {
          console.error("Aucune entreprise trouvée dans la réponse de l'API");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  // Rendu de l'interface utilisateur
  return (
    <div className="login-page">
      {/* Ajout de la balise <form> autour du contenu de connexion */}
      <img src="/logo.png" alt="Logo de NotiMail" />

      <form onSubmit={handleSubmit}>
        <div className="login-name">
          <SelectMenu
            required // Ajout de l'attribut required pour activer l'alerte par défaut
            title="Entreprises"
            options={entreprise.map((label) => ({ label, value: label }))}
            selected={selectedCompany}
            onSelect={(item) => setSelectedCompany(item.value)}
          >
            <Button type="button">
              {/* bouton evergreen en submit par défaut; à mettre en type="button" pour qu'il n'envoie pas le formulaire*/}
              {selectedCompany || "Choisir une entreprise"}
            </Button>
          </SelectMenu>
        </div>

        {/* Champ de mot de passe */}
        <div className="login-password">
          <input
            required // Ajout de l'attribut required pour activer l'alerte par défaut
            type="password"
            placeholder="Mot de passe" // Placeholder du champ de mot de passe
            value={password} // Valeur du champ de mot de passe
            onChange={(e) => setPassword(e.target.value)} // Gère le changement de la valeur du champ de mot de passe
          />
          {/* Icône de cadenas pour indiquer le champ de mot de passe */}
          <span className="lock-icon">
            {password ? <FaUnlock /> : <FaLock />}{" "}
            {/* Condition pour afficher l'icône appropriée */}
            {/* FaLock: cadenas fermé / FaUnlock: cadenas ouvert */}
          </span>
        </div>

        {/* Affiche une alerte si les champs sont vides*/}
        {showAlert && (
          <div className="empty-fields-alert">
            Veuillez remplir tous les champs.
          </div>
        )}

        {/* Bouton de connexion */}
        <button
          className="connection"
          type="submit"
          disabled={buttonDisabled || isLoginButtonDisabled}
        >
          {/* bouton normal par défaut à mettre en type="submit" */}
          Se connecter
        </button>
      </form>
    </div>
  );
};

// Export du composant pour pouvoir l'utiliser ailleurs dans l'application
export default Login;
