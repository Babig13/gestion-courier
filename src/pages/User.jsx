import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import "./user.css";
import { FaEnvelope } from "react-icons/fa6";

const User = () => {
  // Utilise le hook d'effet pour effectuer une action après le rendu initial
  const [hasMail, setHasMail] = useState(false);
  // Effectue une action après que le composant a été affiché à l'écran
  useEffect(() => {
    // Ton code d'effet va ici

    // Effectuez la requête pour vérifier le courrier en attente
    const userId = localStorage.getItem("userId"); // Récupère l'ID de l'utilisateur depuis le stockage local

    fetch(`http://51.83.69.229:3000/api/users/checkMail/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Vérifiez si le courrier est en attente
        console.log("Réponse du serveur :", data);

        if (data && data.hasMail) {
          setHasMail(true);
          // Met à jour l'état pour indiquer qu'il y a du courrier en attente
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la vérification du courrier:", error)
      );
  }, []); // Le tableau de dépendances vide signifie que cet effet s'exécute une seule fois après le montage initial

  return (
    <div>
      <Header /> {/* Composant pour l'en-tête de la page utilisateur */}
      <div className="rien">
        <FaEnvelope className="enveloppe-icon" />
        {/* Affiche l'icône d'enveloppe avec la classe "enveloppe-icon" pour la personnalisation du style */}

        {hasMail ? (
          <div className="notification">
            {/* Affiche la notification s'il y a du courrier en attente */}
            <p>Vous avez du courrier en attente!</p>
          </div>
        ) : (
          <div className="notification">
            {/* Affiche la notification s'il n'y a pas de courrier en attente */}
            <p>Aucun courrier en attente.</p>
          </div>
        )}
        <button className="reception" type="button">
          Réceptionner
        </button>
        {/* Affiche un bouton "Réceptionner" avec la classe "reception" */}
        {/* Vous pouvez ajouter des fonctionnalités à ce bouton, par exemple, pour gérer la réception du courrier */}

        {/* Affichez d'autres contenus de la page User ici */}
      </div>
    </div>
  );
};

export default User;

// faut-il faire une deuxième page pour la notification "vous avez du courrier"
// ou faire un composant avec les deux valeurs (courrier ou pas) et l'appeler
// dans la page User.
// question déjà poser à notre ami
