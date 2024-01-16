//création de la page de connexion

// Import des composants nécessaires depuis Evergreen UI et React
import { Autocomplete, Button, Pane, TextInput } from "evergreen-ui";
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaUnlock } from "react-icons/fa6";
import "./login.css"; // Import du fichier CSS pour la page de connexion

// Définition du composant de connexion
const Login = () => {
  // États pour gérer les données de l'utilisateur et l'état de connexion
  const [password, setPassword] = useState(""); // Mot de passe
  const [entreprise, setEntreprise] = useState([]); // Liste des entreprises récupérée depuis l'API
  const [selectedCompany, setSelectedCompany] = useState(""); // Entreprise sélectionnée par l'utilisateur
  const [loggedIn, setLoggedIn] = useState(false); // État de connexion
  const [tabselect, settabselect] = useState([]); // Tableau pour stocker les noms des entreprises (utilisé dans Autocomplete)

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
    fetch("http://51.83.69.229:3000/api/users/gestionEntrepriseFirmName", {
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
        if (data.firmNames && data.firmNames.length > 0) {
          // Formatage des données pour les adapter au composant Autocomplete

          setEntreprise(data.firmNames);
        } else {
          console.error("Aucune entreprise trouvée dans la réponse de l'API");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  //pour savoir quel type: objet ou tableau
  // const typeDuState = typeof tabselect;
  // console.log(typeDuState);

  const tableauEntreprise = Object.entries(tabselect);

  const nomEntreprise = tabselect
    ? tabselect.map((entreprise) => entreprise)
    : [];
  console.log(nomEntreprise);

  // Rendu de l'interface utilisateur
  return (
    <div className="login-page">
      <img src="./logo.png" alt="Logo de NotiMail" />
      {/* Composant Autocomplete pour la sélection de l'entreprise */}

      {/*  Champ d'autocomplétion(saisie semi-automatique) pour la sélection d'une entreprise */}

      <div className="login-name">
        <Autocomplete
          title="Entreprises"
          onChange={(changedItem) => setSelectedCompany(changedItem)}
          items={entreprise}
        >
          {({
            getInputProps,
            getToggleButtonProps,
            getRef,
            inputValue,
            getItemProps,
            getMenuProps,
            isOpen,
            toggleMenu,
          }) => (
            <>
              <Pane ref={getRef} display="flex">
                <TextInput
                  placeholder="Entreprise"
                  value={inputValue}
                  {...getInputProps()}
                />
                <Button
                  onClick={() => {
                    toggleMenu();
                  }}
                  {...getToggleButtonProps()}
                  className="autocomplete-button"
                >
                  <FaChevronDown />
                </Button>
              </Pane>

              {isOpen && (
                <ul {...getMenuProps()}>
                  {nomEntreprise.map((item, index) => (
                    <li key={item} {...getItemProps({ item })}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </Autocomplete>
      </div>

      {/* Champ de mot de passe */}
      <div className="login-password">
        <p>{tabselect}</p>
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
