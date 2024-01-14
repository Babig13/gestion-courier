//création de la page de connexion

// Import des composants nécessaires depuis Evergreen UI et React
import { Autocomplete, Button, Pane, TextInput } from "evergreen-ui";
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaUnlock } from "react-icons/fa6";
import "./login.css"; // Import du fichier CSS pour la page de connexion

// Définition du composant de connexion
const Login = () => {
  // États pour gérer les données de l'utilisateur et l'état de connexion
  const [username, setUsername] = useState(""); // Nom de l'utilisateur (non utilisé dans le code actuel)
  const [password, setPassword] = useState(""); // Mot de passe
  const [entreprise, setEntreprise] = useState([]); // Liste des entreprises récupérée depuis l'API
  const [selectedCompany, setSelectedCompany] = useState(""); // Entreprise sélectionnée par l'utilisateur
  const [loggedIn, setLoggedIn] = useState(false); // État de connexion
  const [tabselect, settabselect] = useState([]); // Tableau pour stocker les noms des entreprises (utilisé dans Autocomplete)
  //const [nomEntreprise, setNomEntreprise] = useState("");

  // Vérifier si le bouton de connexion doit être activé
  const isLoginButtonDisabled = !selectedCompany || !password;

  // Fonction appelée lorsqu'un utilisateur tente de se connecter
  const handleLogin = () => {
    // Construction du corps de la requête pour l'identification du client
    const requestBody = {
      firm_name: selectedCompany,
      four_digit_code: password,
    };

    // Requête au serveur pour vérifier les identifiants
    fetch("http://51.83.69.229:3000/api/users/login", {
      method: "POST", // Méthode POST
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Vérification du succès de la connexion
        if (data && data.success) {
          setLoggedIn(true);
        } else {
          alert("Identifiants incorrects");
        }
      })
      .catch((error) => console.error(error));
  };

  // Effet pour charger la liste des entreprises depuis l'API lors du chargement de la page
  useEffect(() => {
    // Requête au serveur pour obtenir la liste des entreprises
    fetch("http://51.83.69.229:3000/api/users/gestionEntreprise", {
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

        // Vérifier le type de contenu de la réponse
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("La réponse n'est pas au format JSON");
        }

        // Parse la réponse en JSON
        return response.json();
      })

      .then((data) => {
        // Log de la réponse brute pour le débogage
        console.log(data);

        // Vérification du succès de la récupération des entreprises
        if (data.length > 0) {
          // Formatage des données pour les adapter au composant Autocomplete

          setEntreprise(data);

          //Création d'un tableau contenant les noms des entreprises
          var tab = [];

          for (let i = 0; i < data.length; i++) {
            tab.push(data[i].firm_name);
          }

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
      <img src="./logo.png" alt="Logo de NotiMail" />
      {/* Composant Autocomplete pour la sélection de l'entreprise */}

      {/* <select>
        {entreprise.map((el) => {
          return <option value={el.firm_name}>{el.firm_name}</option>;
        })}
      </select> */}

      {/*  Champ d'autocomplétion(saisie semi-automatique) pour la sélection d'une entreprise */}
      <div className="login-name">
        <Autocomplete
          title="Entreprises" //Titre de l'autocomplétion
          onChange={(changedItem) => setSelectedCompany(changedItem)}
          // Gère le changement de l'élément sélectionné
          items={tabselect} // Liste des éléments à afficher dans l'autocomplétion
        >
          {({
            getInputProps,
            getToggleButtonProps,
            getRef,
            inputValue,
            toggleMenu,
          }) => (
            <Pane ref={getRef} display="flex">
              <TextInput
                placeholder="Entreprise" // Placeholder du champ de texte
                value={inputValue} // Valeur du champ de texte
                {...getInputProps()} // Propriétés pour le champ de texte (Autocomplétion)
              />
              <Button
                onClick={toggleMenu} // Gère le clic sur le bouton
                {...getToggleButtonProps()} // Propriétés pour le bouton (Autocomplétion)
                className="autocomplete-button" // Classe CSS pour le bouton
              >
                {/*Icône flèche vers le bas pour indiquer le menu déroulant  */}
                <FaChevronDown />
              </Button>
            </Pane>
          )}
        </Autocomplete>
      </div>

      {/* Champ de mot de passe */}
      <div className="login-password">
        <input
          type="password"
          placeholder="Mot de passe" // Placeholder du champ de mot de passe
          value={password} // Valeur du champ de mot de passe
          onChange={(e) => setPassword(e.target.value)} // Gère le changement de la valeur du champ de mot de passe
        />
        {/* Icône de cadenas pour indiquer le champ de mot de passe */}
        <FaUnlock />
      </div>

      {/* Bouton de connexion */}
      <button onClick={handleLogin} disabled={isLoginButtonDisabled}>
        Se connecter
      </button>
    </div>
  );
};

// Export du composant pour pouvoir l'utiliser ailleurs dans l'application
export default Login;
