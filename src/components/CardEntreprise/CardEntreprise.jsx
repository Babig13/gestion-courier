import React, { useState, useEffect } from "react";
import { FaPenToSquare, FaPhone, FaAt } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { Spinner } from "evergreen-ui";
import "./CardEntreprise.css";
import { Link } from "react-router-dom";

export default function CardEntreprise({ searchTerm, setSelectedCompanies }) {
  /* Afficher ou pas la 2e partie de la card */
  const [visibilityMap, setVisibilityMap] = useState({});
  /* Vérifier que l'information a bien été récupéré*/
  const [load, setLoad] = useState(true);
  // Permet de selectionner les cases individuellement.

  /* Fetch pour récupérer les informations d'entreprise */
  const [companies, setCompanies] = useState([]);
  // État pour stocker les entreprises filtrées
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    const requestBody = {};

    fetch("http://51.83.69.229:3000/api/users/gestionEntreprise", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        setCompanies(data);
        const receptionne = data.some((company) => company.has_mail); // Vérifiez si au moins une entreprise a reçu le courrier
        setLoad(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setLoad(false);
      });
  }, []);

  useEffect(() => {
    // Le useEffect s'exécute chaque fois que searchTerm ou companies change.

    if (searchTerm && searchTerm.trim() !== "") {
      // Vérifie si searchTerm existe et n'est pas une chaîne vide après avoir retiré les espaces.

      // Crée une expression régulière (regex) pour effectuer une recherche insensible à la casse.
      const searchRegex = new RegExp(searchTerm, "i");

      // Filtre les entreprises en fonction du terme de recherche.
      const filteredData = companies.filter((company) => {
        const { firm_name, first_name, last_name } = company;

        // Vérifie si le terme de recherche correspond à firm_name, first_name ou last_name.
        return (
          searchRegex.test(firm_name) ||
          searchRegex.test(first_name) ||
          searchRegex.test(last_name)
        );
      });

      // Met à jour l'état avec les entreprises filtrées.
      setFilteredCompanies(filteredData);
    } else {
      // Si le terme de recherche est vide, affiche toutes les entreprises sans filtre.
      setFilteredCompanies(companies);
    }
  }, [searchTerm, companies]);

  // Permet de différencier les checkbox  {clé  : valeur, clé : valeur }
  const handleCheckboxChange = (company) => {
    setSelectedCompanies((prevState) => [
      ...prevState,
      { _id: company._id, firm_name: company.firm_name },
    ]);
  };

  // Fonction pour basculer la visibilité d'une entreprise spécifique
  const toggleVisibility = (companyId) => {
    setVisibilityMap((prevState) => ({
      ...prevState,
      [companyId]: !prevState[companyId],
    }));
  };

  // Au click sur l'icone edit envoie des données vers nouvelle page dans l'url
  const handleIconClick = (firm_name) => {
    // Naviguer vers la nouvelle page avec les données
    const editPath = `/admin/${firm_name}`;
    history.push(editPath);
  };

  return (
    <>
      <div className="companies-card-frame">
        {/* Je m'assure que l'information est bien chargé */}
        {load ? (
          <Spinner size={24} />
        ) : (
          filteredCompanies &&
          filteredCompanies.map((company, index) => (
            <div className="companie-card" key={index}>
              <div
                className={`top-companie-card ${
                  visibilityMap[company._id] ? "top-companie-card-open" : ""
                }`}
              >
                <div className="top-left-card">
                  <div className="pastille-edit-frame">
                    <div
                      className={`pastille ${
                        company.has_mail ? "pastille-rouge" : "pastille-verte"
                      }`}
                    ></div>

                    <Link to={`/admin/${company.firm_name}`}>
                      <IconContext.Provider
                        value={{
                          color: "white",
                          className: "card-button",
                          size: "24px",
                        }}
                      >
                        <FaPenToSquare />
                      </IconContext.Provider>
                    </Link>
                  </div>

                  <div
                    className="card-open"
                    onClick={() => toggleVisibility(company._id)}
                  >
                    <h2>{company.firm_name}</h2>

                    <p>
                      {company.first_name} {company.last_name}
                    </p>

                    <p>
                      {company.last_picked_up ||
                        `N'a pas encore reçu de courrier`}
                    </p>
                  </div>
                </div>

                <div>
                  <input
                    type="checkbox"
                    className="card-selection"
                    onChange={() => handleCheckboxChange(company)}
                  />
                </div>
              </div>

              {visibilityMap[company._id] && (
                <IconContext.Provider
                  value={{
                    color: "white",
                    className: "companies-icons",
                    size: "24px",
                  }}
                >
                  <div className="bottom-companie-card">
                    <div>
                      <FaAt />
                      <a href={`mailto:${company.email}`}>{company.email}</a>
                    </div>

                    <div>
                      <FaPhone />
                      <a href={`tel:${company.phone_number}`}>
                        {company.phone_number}
                      </a>
                    </div>
                  </div>
                </IconContext.Provider>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
