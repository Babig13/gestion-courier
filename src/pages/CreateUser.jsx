// Import des composants nécessaires depuis Evergreen UI et React
import React, { useState, useEffect } from "react";
import { Button, Card, TextInput, Checkbox } from "evergreen-ui";
import { FaArrowLeft, FaTrash } from "react-icons/fa6";
import "./CreateUser.css"; // Lien vers le fichier CSS
//import { useHistory } from "react-router-dom"; // Ajout de l'import pour revenir en arrière

// Définition du composant de création de compte
const CreateUser = () => {
  // États pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    entreprise: "",
    prenom: "",
    nom: "",
    telephone: "",
    email: "",
    isAdmin: false,
  });

  // Utilisation de useHistory
  //const history = useHistory();

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = () => {
    fetch("http://51.83.69.229:3000/api/users/createUser", {
      method: "POST", // Méthode POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Ajout des données du formulaire
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Rediriger vers la page de connexion après la création de l'utilisateur
        //history.push("/login");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="create-user-page">
      {/* Logo */}
      <img src="./logo.png" alt="Logo de NotiMail" />

      <div className="header-container">
        {/* Bouton de retour */}
        <Button
          appearance="minimal"
          onClick={() => {
            // Ajoutez ici la logique pour revenir en arrière
            // Exemple : history.goBack();
          }}
          className="back-button" // Ajoutez une classe pour les styles supplémentaires
        >
          {/* flèche vers la gauche */}
          <FaArrowLeft />
        </Button>

        {/* Titre "Entreprise" */}
        <h2>Entreprise</h2>
      </div>

      {/* Carte (Card) contenant le formulaire */}
      <Card elevation={1} className="user-form-card">
        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          {/* Champ Entreprise */}
          <label>
            Entreprise
            <TextInput
              required
              value={formData.entreprise}
              onChange={(e) =>
                setFormData({ ...formData, entreprise: e.target.value })
              }
            />
          </label>

          {/* Champs Prénom et Nom côte à côte */}
          <div className="name-fields">
            <div>
              {/* Champ Prénom */}
              <label>
                Prénom
                <TextInput
                  required
                  value={formData.prenom}
                  onChange={(e) =>
                    setFormData({ ...formData, prenom: e.target.value })
                  }
                />
              </label>
            </div>

            <div>
              {/* Champ Nom */}
              <label>
                Nom
                <TextInput
                  required
                  value={formData.nom}
                  onChange={(e) =>
                    setFormData({ ...formData, nom: e.target.value })
                  }
                />
              </label>
            </div>
          </div>

          {/* Champ Téléphone */}
          <label>
            Téléphone
            <TextInput
              required
              value={formData.telephone}
              onChange={(e) =>
                setFormData({ ...formData, telephone: e.target.value })
              }
            />
          </label>

          {/* Champ Email */}
          <label>
            Email
            <TextInput
              required
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </label>

          {/* Checkbox Admin */}
          <label>
            Admin
            <Checkbox
              checked={formData.isAdmin}
              onChange={(e) =>
                setFormData({ ...formData, isAdmin: e.target.checked })
              }
            />
          </label>

          {/* Boutons */}
          <div className="form-buttons">
            {/* Bouton Supprimer */}
            <Button
              appearance="primary"
              intent="danger"
              iconBefore={FaTrash}
              onClick={() => {
                // Ajoutez ici la logique pour supprimer
              }}
            >
              Supprimer
            </Button>

            {/* Bouton Terminer */}
            <Button appearance="primary" intent="success" type="submit">
              Terminer
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateUser;
