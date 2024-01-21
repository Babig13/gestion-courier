import { useEffect, useState } from "react";
import "./Header.css";

// Définition du composant Header
const Header = () => {
  // État pour stocker les données des entreprises
  const [companies, setCompanies] = useState([]);

  // Effet qui s'exécute lors du chargement du composant
  useEffect(() => {
    // Requête au serveur pour obtenir la liste des entreprises
    fetch("http://51.83.69.229:3000/api/users/gestionEntreprise", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(requestBody)
    })
      .then((response) => {
        // Vérifier si la réponse est OK
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        // Parse la réponse en JSON
        return response.json();
      })
      .then((data) => {
        // Met à jour l'état companies avec les données récupérées
        setCompanies(data);
        console.log(data);
      })
      .catch((error) => console.error("Erreur:", error));
  }, []); // Le tableau vide [] indique que cet effet s'exécute une seule fois au chargement du composant

  // Rendu de l'interface utilisateur
  return (
    <>
      {/* Balise de l'en-tête */}
      <header>
        {/* Logo de l'application */}
        <img src="../petit-logo.png" alt="Logo NotiMail" />
        <div>
          {/* Affichage du nom de l'entreprise */}
          {companies.length > 0 ? (
            <p>{companies[0].firm_name}</p>
          ) : (
            <p>Chargement en cours...</p>
          )}
          {/* Bouton de déconnexion */}
          <button type="button" id="logoutButton" aria-label="Se déconnecter">
            Deconnexion
          </button>
        </div>
      </header>
    </>
  );
};

{
  /* Bouton de déconnexion */
}
export default Header;
