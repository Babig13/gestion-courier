// Import des composants nécessaires depuis Evergreen UI et React
import React, { useState, useEffect } from "react";
import { Button, Card, TextInput, Checkbox } from "evergreen-ui";
import { FaArrowLeft, FaTrash } from "react-icons/fa6";
import "./CreateUser.css"; // Lien vers le fichier CSS
import { useNavigate } from "react-router-dom"; // Ajout de l'import pour revenir en arrière

// Définition du composant de création de compte
const CreateUser = () => {
  const navigate = useNavigate(); // Initialisez useNavigate

  // États pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    firm_name: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    is_admin: false,
  });
  

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
    // Exemple : redirection vers la page de connexion après la création de l'utilisateur
    navigate("/admin");
  };

  // Fonction pour gérer la suppression d'un utilisateur
  const handleDelete = () => {
    // Utilisation de l'API pour supprimer un utilisateur par son ID
    fetch(`http://51.83.69.229:3000/api/users/delete/${userData.id}`, {
      method: "DELETE", // Méthode DELETE
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Ajoutez ici la logique pour traiter la réponse de la suppression
        // Par exemple, rediriger l'utilisateur vers une autre page ou actualiser la liste des utilisateurs, etc.
      })
      .catch((error) => console.error(error));
    // Exemple : redirection vers la page d'administration après la suppression
    navigate("/admin");
  };

  return (
    <div className="create-user-page">
      {/* Logo */}
      <img src="../logo.png" alt="Logo de NotiMail" />

      <div className="header-container">
        {/* Bouton de retour */}
        <Button
          appearance="minimal"
          onClick={() => {
            navigate("/admin");
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
                value={formData.firm_name}
                onChange={(e) =>
                    setFormData({ ...formData, firm_name: e.target.value })
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
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
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
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
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
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
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
              checked={formData.is_admin}
              onChange={(e) => {
                setFormData({ ...formData, is_admin: e.target.checked })
                console.log(formData)
              }}
            />
          </label>

          {/* Boutons */}
          <div className="form-buttons">
            {/* Bouton Supprimer */}
            <Button
              appearance="primary"
              intent="danger"
              iconBefore={FaTrash} //icone poubelle
              onClick={handleDelete}
            >
              Supprimer
            </Button>

            {/* Bouton Terminer */}
            <Button appearance="primary" intent="success" type="submit">
              Créer
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateUser;