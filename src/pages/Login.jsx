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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [entreprise, setEntreprise] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Vérification factice. On remplace par les infos stockées dans la page Admin/création de compte
    if (
      (username === "admin" && password === "admin") ||
      (username === "user" && password === "user")
    ) {
      setLoggedIn(true);
    } else {
      alert("Identifiants incorrects");
    }
  };

  useEffect(() => {
    // Fetch des noms des entreprises depuis l'API
    const requestBody = {};

    fetch("http://51.83.69.229:3000/api/users/gestionEntreprise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Ajout de cette ligne pour inspecter la structure de l'objet dans la console

        // Vérifiez si les données sont à l'intérieur d'une propriété de l'objet (ajustez "votreProprieteTableau" en conséquence)
        const dataArray = data.hasOwnProperty("votreProprieteTableau")
          ? data.votreProprieteTableau
          : data;

        // Formattez les données pour les adapter au composant Autocomplete
        const formattedData = dataArray.map((entreprise) => ({
          label: entreprise.nom,
          value: entreprise.id,
        }));

        setEntreprise(formattedData);
        console.log(formattedData);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="login-page">
      <img src="./logo.png" alt="Logo de NotiMail" />
      <Autocomplete
        title="Entreprises"
        onChange={(changedItem) => setSelectedCompany(changedItem)}
        items={entreprise}
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
      <div className="login-password">
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FaUnlock />
      </div>
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
};

export default Login;
