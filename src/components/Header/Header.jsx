import { useEffect, useState } from "react";
import "./Header.css";

export default function Header() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("http://51.83.69.229:3000/api/users/gestionEntreprise", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(requestBody)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        setCompanies(data);
        console.log(data);
      })
      .catch((error) => console.error("Erreur:", error));
  }, []);

  return (
    <>
      <header>
        <img src="../petit-logo.png" alt="Logo NotiMail" />
        <div>
          {/* <p>{firmName[0].firm_name}</p> */}

          {companies.length > 0 ? (
            <p>{companies[0].firm_name}</p>
          ) : (
            <p>Chargement en cours...</p>
          )}
          <button type="button" id="logoutButton" aria-label="Se déconnecter">
            Deconnexion
          </button>
        </div>
      </header>
    </>
  );
}
