import { useEffect, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  // Stocker le firmname
  const [whoIsLoggedIn, setWhoIsLoggedIn] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les données du localStorage
    const storedFirmName = localStorage.getItem("firm_name");
    const storedIsAdmin = localStorage.getItem("is_admin");

    // Vérifier si les données existent et les mettre à jour dans le composant
    if (storedFirmName) {
      // Set Firmname
      setWhoIsLoggedIn(storedFirmName);
    }
  }, []);

  // Se déconnecter au clic du bouton "Déconnexion"
  function handleLogout(e) {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <header>
        <img src="../petit-logo.png" alt="Logo NotiMail" />
        <div>
          {whoIsLoggedIn.length > 0 ? (
            <p>{whoIsLoggedIn}</p>
          ) : (
            <p>Chargement en cours...</p>
          )}
          <button
            onClick={handleLogout}
            type="button"
            id="logoutButton"
            aria-label="Se déconnecter"
          >
            Deconnexion
          </button>
        </div>
      </header>
    </>
  );
}
