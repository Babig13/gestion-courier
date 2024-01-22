import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import "./user.css";
import { FaEnvelope } from "react-icons/fa6";
import { IoMdMailUnread } from "react-icons/io"; //enveloppe avec notification
import Notification from "../components/Notification/Notification";
import { Dialog } from "evergreen-ui";

const User = () => {
  // Utilise le hook d'effet pour effectuer une action après le rendu initial
  const [hasMail, setHasMail] = useState(false);

  // Effectue une action après que le composant a été affiché à l'écran
  const [buttonColor, setButtonColor] = useState("--primary");
  // Par défaut, utilisez la couleur primaire

  const [isShown, setIsShown] = React.useState(false);
  //pour ouvrir la modale quand on clique sur le bouton "réceptionner"

  // Effectuez la demande POST pour accuser la récupération du courrier
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // code d'effet va ici

    // Effectuez la requête pour vérifier le courrier en attente
    const userId = localStorage.getItem("userId"); // Récupère l'ID de l'utilisateur depuis le stockage local

    fetch(`http://51.83.69.229:3000/api/users/checkMail/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Vérifiez si le courrier est en attente
        console.log("Réponse du serveur :", data);

        if (data && data.hasMail) {
          setHasMail(true);
          // Met à jour l'état pour indiquer qu'il y a du courrier en attente
          // Change la couleur du bouton en fonction de la présence de courrier
          setButtonColor("--primary");
        } else {
          setHasMail(false);
          // Si pas de courrier en attente, met à jour la couleur du bouton à une variante plus claire
          setButtonColor("--blue-light");
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la vérification du courrier:", error)
      );
  }, []); // Le tableau de dépendances vide signifie que cet effet s'exécute une seule fois après le montage initial

  const handleConfirm = () => {
    // Ajoutez le code à exécuter lors de la confirmation
    console.log("Courrier confirmé!");
    setHasMail(false); // Mettre à jour l'état pour indiquer que le courrier a été reçu
    setIsShown(false); // Ferme la modale

    fetch(`http://51.83.69.229:3000/api/users/acknowledgeMail/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Vous pouvez envoyer des données supplémentaires si nécessaire
      // body: JSON.stringify({ additionalData: "valeur" }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Traitez la réponse si nécessaire
        console.log("Réponse de la demande POST:", data);
      })

      .catch((error) => {
        console.error("Erreur lors de la demande POST:", error);
      });
  };

  const handleCancel = () => {
    // Ajoutez le code à exécuter lors de l'annulation
    console.log("Confirmation annulée!");
    setIsShown(false); //ferme la modale
  };

  return (
    <div>
      <Header /> {/* Composant pour l'en-tête de la page utilisateur */}
      <div className="rien">
        {/* Affiche l'icône d'enveloppe avec la classe "enveloppe-icon" pour la personnalisation du style */}
        {hasMail ? (
          <IoMdMailUnread className="enveloppe-icon" />
        ) : (
          <FaEnvelope className="enveloppe-icon" />
        )}

        {/*"?" suivi de ":" permet de remplacer la condition "if" et "else" mais 
        qui a la même fonction
        c'est à dire "si"  et "sinon"*/}

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
        <div className="modal">
          <Dialog
            id="modal-container"
            isShown={isShown}
            onCloseComplete={() => setIsShown(false)}
            hasFooter={false}
            containerProps={{ className: "custom-modal-container" }}
          >
            <Notification onConfirm={handleConfirm} onCancel={handleCancel} />
          </Dialog>
          <button
            // change la couleur du bouton selon la notification
            className={`reception ${hasMail ? "--primary" : "--blue-light"}`}
            type="button"
            onClick={() => setIsShown(true)}
            disabled={!hasMail} // désactive le bouton si hasMail est false
          >
            Réceptionner
          </button>
          {/* Affiche un bouton "Réceptionner" avec la classe "reception" */}
          {/* Vous pouvez ajouter des fonctionnalités à ce bouton, par exemple, pour gérer la réception du courrier */}

          {/* Affichez d'autres contenus de la page User ici */}
        </div>
      </div>
    </div>
  );
};

export default User;
