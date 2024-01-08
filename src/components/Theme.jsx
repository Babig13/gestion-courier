// theme.jsx
import React, { createContext, useContext } from "react";

//on crée un context:ici, ThemeContext.
//context est un concept dans React qui permet de partager
//des données spécifiques.
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext); // Utilise le contexte avec le hook useContext

  //if (!context) {
  //throw new Error("useTheme must be used within a ThemeProvider")};
  // lancer une nouvelle erreur("useTheme doit être utilisé dans un ThemeProvider")

  //si un composant utilise le hook 'useTheme' en dehors d'un 'ThemeProvider'
  //la valeur de 'context' sera 'undefined'.

  return context;
};
//ThemeProvider composant qui enveloppe l'application et utilise le contexte
//pour fournir le thème à tous ses composants enfants.
export const ThemeProvider = ({ children, theme }) => {
  //'children'composants enfants qui seront enveloppés par le 'ThemeProvider'
  //'theme' objet contenant les variables de style
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

//variables de style
export const theme = {
  colors: {
    primary: "#025892", //bleu du logo
    primaryLight: "#267114", //bleu du logo en plus clair
    secondary: "#008787", //bleu-vert du logo
    red: "#DB162F",
    validation: "#049D2F", //vert pour tous les boutons de validation
    grey: "#EBEBEB", //navigation et footer
    white: "#FFFFFF",
    black: "#000000", //texte de la page de connexion
    text: "#006C92",
  },
  typography: {
    //pour les noms des entreprises entre-autre
    title: {
      fontFamily: "Kanit, sans-serif",
      fontSize: 24,
      fontWeight: 600,
    },
    //pour le reste des textes en général.
    //il faudra voir pour les ajustements de taille ou en italique, etc.
    body: {
      fontFamily: "Karla, sans-serif",
      fontSize: 16,
      fontWeight: 400,
    },
  },
  // ... autres variables de style ...
};
