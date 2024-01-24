// Import des composants nécessaires depuis Evergreen UI et React
import React, { useState, useEffect } from "react";
import { Button, Card, TextInput, Checkbox } from "evergreen-ui";
import { FaArrowLeft, FaTrash } from "react-icons/fa6";
import "./EditUser.css"; // Lien vers le fichier CSS
import { useNavigate, useParams } from "react-router-dom"; // Ajout de l'import pour revenir en arrière

// TODO:
// Définition du composant de création de compte
const EditUser = () => {
  // États pour gérer les données du formulaire
  const navigate = useNavigate();
  const { firm_name } = useParams();

  const [formData, setFormData] = useState({
    firm_name: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    is_admin: false,
  });

  // Effet pour charger les données de l'utilisateur lors du chargement du composant
  useEffect(() => {
    // Utilisez une fonction asynchrone pour effectuer la requête
    const fetchCompanyData = async () => {
      try {
        // Utilisez le nom de l'entreprise extrait de useParams dans l'URL de la requête
        const response = await fetch(
          `http://51.83.69.229:3000/api/user/firm/${firm_name}`
        );

        // Vérifiez si la requête a réussi
        if (response.ok) {
          const userData = await response.json();
          // Mettez à jour l'état avec les données récupérées
          setFormData({
            entreprise: userData.entreprise,
            prenom: userData.prenom,
            nom: userData.nom,
            telephone: userData.telephone,
            email: userData.email,
            isAdmin: userData.isAdmin,
          });
        } else {
          console.error(
            `Erreur lors de la récupération des données de l'entreprise. Statut de la réponse : ${response.status}`
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'entreprise",
          error
        );
      }
    };

    // Appelez la fonction fetchCompanyData
    fetchCompanyData();
  }, [firm_name]);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = () => {
    fetch(`http://51.83.69.229:3000/api/users/firm/${firm_name}`, {
      method: "PUT", // Méthode PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Ajout des données du formulaire
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
    // Exemple : redirection vers la page de connexion après la création de l'utilisateur
    navigate("/login");
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
    <div className="edit-user-page">
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
              onClick={handleDelete}
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

export default EditUser;
