//création de la page de connexion

import { Autocomplete, Button, Pane, TextInput } from "evergreen-ui";
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaUnlock } from "react-icons/fa6";

// const Login = () => {
//   const [username, setUsername] = useState(""); //nom de l'utlisateur
//   const [password, setPassword] = useState(""); //le mot de passe
//   const [entreprise, setEntreprise] = useState([]); //infos sur l'entreprise sélectionnée dans le menu déroulant
//   const [selectedCompany, setSelectedCompany] = useState(""); // Ajout de l'état pour stocker l'entreprise sélectionnée
//   const [loggedIn, setLoggedIn] = useState(false); //loggedIn=connecté

//   const handleLogin = () => {
//     //est appelée quand l'utilisateur clique sur le bouton"connexion".

//     // Vérification factice. On remplace par les infos stockées dans la page Admin/création de compte
//     if (username === "admin" && password === "admin") {
//       setLoggedIn(true);
//     } else if (username === "user" && password === "user") {
//       setLoggedIn(true);
//     } else {
//       alert("Identifiants incorrects");
//     }
//   };

//   useEffect(() => {
//     // Fetch des noms des entreprises depuis l'API
//     const requestBody = {};

//     fetch("http://51.83.69.229:3000/api/users/gestionEntreprise", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestBody),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setEntreprise(data);
//         console.log(data);
//       })
//       .catch((error) => console.error(error));
//   }, []);

//   return (
//     <div className="login-page">
//       <img src="./logo.png" alt="Logo de NotiMail" />
//       {/* //   <input */}
//       {/* //     type="text"
//     //     placeholder="Nom de l'entreprise"
//     //     value={selectedCompany}
//     //     onChange={(e) => setSelectedCompany(e.target.value)}
//     //   /> */}
//       <Autocomplete
//         title="Entreprises"
//         onChange={(changedItem) => setSelectedCompany(changedItem)}
//         items={entreprise}
//       >
//         {({
//           getInputProps,
//           getToggleButtonProps,
//           getRef,
//           inputValue,
//           toggleMenu,
//         }) => (
//           <Pane ref={getRef} display="flex">
//             <TextInput
//               placeholder="Entreprise
//               "
//               value={inputValue}
//               {...getInputProps()}
//             />
//             <Button onClick={toggleMenu} {...getToggleButtonProps()}>
//               <FaChevronDown />
//             </Button>
//           </Pane>
//         )}
//       </Autocomplete>
//       <div className="login-password">
//         <input
//           type="password"
//           placeholder="Mot de passe"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <FaUnlock />
//       </div>
//       <button onClick={handleLogin}>Se connecter</button>
//     </div>
//   );
// };

// export default Login;
// ... (autres imports)

// ... (autres imports)

// ... (autres imports)

// ... (autres imports)

const Login = () => {
  // États pour gérer les données de l'utilisateur et l'état de connexion
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [entreprise, setEntreprise] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [tabselect, settabselect] = useState([]);
  //const [nomEntreprise, setNomEntreprise] = useState("");

  // Vérifier si le bouton de connexion doit être activé
  const isLoginButtonDisabled = !selectedCompany || !password;

  // Fonction appelée lorsqu'un utilisateur tente de se connecter
  const handleLogin = () => {
    // Construction du corps de la requête pour l'identification du client
    const requestBody = {
      firm_name: selectedCompany,
      four_digit_code: password,
    };

    // Requête au serveur pour vérifier les identifiants
    fetch("http://51.83.69.229:3000/api/users/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Vérification du succès de la connexion
        if (data && data.success) {
          setLoggedIn(true);
        } else {
          alert("Identifiants incorrects");
        }
      })
      .catch((error) => console.error(error));
  };

  // Effet pour charger la liste des entreprises depuis l'API lors du chargement de la page
  useEffect(() => {
    // Requête au serveur pour obtenir la liste des entreprises
    fetch("http://51.83.69.229:3000/api/users/gestionEntreprise", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        //  Vérifier si la réponse est OK
        if (!response.ok) {
          throw new Error("Réponse non valide du serveur");
        }

        // Vérifier le type de contenu de la réponse
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("La réponse n'est pas au format JSON");
        }

        // Parse la réponse en JSON
        return response.json();
      })

      .then((data) => {
        // Log de la réponse brute pour le débogage
        console.log(data);

        // Vérification du succès de la récupération des entreprises
        if (data.length > 0) {
          // Formatage des données pour les adapter au composant Autocomplete

          setEntreprise(data);

          var tab = [];

          for (let i = 0; i < data.length; i++) {
            tab.push(data[i].firm_name);
          }

          settabselect(tab);
        } else {
          console.error("Aucune entreprise trouvée dans la réponse de l'API");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  // Rendu de l'interface utilisateur
  return (
    <div className="login-page">
      <img src="./logo.png" alt="Logo de NotiMail" />
      {/* Composant Autocomplete pour la sélection de l'entreprise */}

      {/* <select>
        {entreprise.map((el) => {
          return <option value={el.firm_name}>{el.firm_name}</option>;
        })}
      </select> */}

      <Autocomplete
        title="Entreprises"
        onChange={(changedItem) => setSelectedCompany(changedItem)}
        items={tabselect}
      >
        {({
          getInputProps,
          getToggleButtonProps,
          getRef,
          inputValue,
          toggleMenu,
        }) => (
          <Pane ref={getRef} display="flex">
            <TextInput
              placeholder="Entreprise"
              value={inputValue}
              {...getInputProps()}
            />
            <Button onClick={toggleMenu} {...getToggleButtonProps()}>
              <FaChevronDown />
            </Button>
          </Pane>
        )}
      </Autocomplete>
      {/* Champ de mot de passe */}
      <div className="login-password">
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FaUnlock />
      </div>
      <button onClick={handleLogin} disabled={isLoginButtonDisabled}>
        Se connecter
      </button>
    </div>
  );
};

export default Login;
