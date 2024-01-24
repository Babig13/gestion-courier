//Importation des modules nécessaires depuis la bibliothèque
//"react-router-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Importation du fichier de styles CSS de l'application
import "./App.css";

// Importation des composants des différentes pages de l'application
import User from "./pages/User";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import PrivateComponent from "./components/PrivateComponent";

// Fonction principale de l'application React
function App() {
  return (
    // Utilisation de la balise fragment pour retourner plusieurs éléments
    //sans avoir de balise parente
    <>
      {/* Utilisation du BrowserRouter pour gérer la navigation avec des routes */}
      <BrowserRouter>
        {/* Définition des différentes routes de l'application */}
        <Routes>
          {/* Route pour la page de connexion */}
          <Route path={"/"} element={<Login />} />
          {/* Route pour la page utilisateur avec un paramètre dynamique firm_name */}
          <Route path={"/user/:firm_name"} element={<User />} />

          {/* Route avec un élément parent (PrivateComponent) pour les pages d'administration */}
          <Route element={<PrivateComponent />}>
            {/* Route pour la page d'administration principale */}
            <Route path={"/admin"} element={<Admin />} />
            {/* Route pour la page de création d'utilisateur dans l'administration */}
            <Route path={"/admin/createuser"} element={<CreateUser />} />
            {/* Route pour la page d'édition d'utilisateur dans l'administration
                 avec un paramètre dynamique firm_name */}
            <Route path={"/admin/:firm_name"} element={<EditUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

// Exportation du composant App en tant que composant par défaut de ce fichier
export default App;
