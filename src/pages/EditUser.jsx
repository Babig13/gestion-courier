// Import des composants nécessaires depuis Evergreen UI et React
import React, { useState, useEffect, useRef } from "react";
import { Button, Card, TextInput, Checkbox } from "evergreen-ui";
import { FaArrowLeft, FaTrash } from "react-icons/fa6";
import "./EditUser.css"; // Lien vers le fichier CSS
import { useNavigate, useParams } from "react-router-dom"; // Ajout de l'import pour revenir en arrière

// Définition du composant de création de compte
const EditUser = () => {
  // États pour gérer les données du formulaire
  const navigate = useNavigate();
  const { firm_name } = useParams();
  const [adminId, setAdminId] = useState("");
  const isMounted = useRef(true);
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");

  const [formData, setFormData] = useState({
    firm_name: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    is_admin: false,
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const getAdminId = localStorage.getItem("userId");
    const getToken = localStorage.getItem("token");
    setAdminId(getAdminId);
    setUserToken(getToken);
  }, []);

  // Effet pour charger les données de l'utilisateur lors du chargement du composant
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch(
          `http://51.83.69.229:3000/api/users/firm/${firm_name}`
        );

        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          setUserId(userData._id);
          setFormData({
            firm_name: userData.firm_name,
            first_name: userData.first_name,
            last_name: userData.last_name,
            phone_number: userData.phone_number,
            email: userData.email,
            is_admin: userData.is_admin,
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

    fetchCompanyData();
  }, [firm_name]);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://51.83.69.229:3000/api/users/update/${userId}`, {
      method: "PUT", // Méthode PUT
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Ajout des données du formulaire
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })

      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    // redirection vers la page de connexion après la création de l'utilisateur
    if (isMounted.current) {
      // redirection vers la page d'administration après la mise à jour
      navigate("/admin");
    }
  };

  // Fonction pour gérer la suppression d'un utilisateur
  const handleDelete = (e) => {
    e.preventDefault();

    // Utilisation de l'API pour supprimer un utilisateur par son ID
    fetch(`http://51.83.69.229:3000/api/users/delete/${userId}`, {
      method: "DELETE", // Méthode DELETE
      headers: {
        Authorization: `Bearer ${userToken}`,
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
    setTimeout(() => {
      navigate("/admin");
    }, 1000);
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
        <h2>{firm_name}</h2>
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
              onChange={(e) =>
                setFormData({ ...formData, is_admin: e.target.checked })
              }
            />
          </label>

          {/* Boutons */}
          <div className="form-buttons">
            {/* Bouton Supprimer */}
            <Button
              type="button"
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
