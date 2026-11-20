import { createContext, useContext, useReducer, useMemo, useCallback } from 'react';

// État de départ : personne n'est connecté, on affiche l'inscription
const ETAT_DEPART = { ecran: 'inscription', utilisateur: null };

// useReducer : toutes les façons de changer l'état sont rassemblées ici.
// Le reducer est une fonction pure : il reçoit (etat, action) et renvoie un NOUVEL état.
function reducer(etat, action) {
  switch (action.type) {
    case 'connecter':
      return { ...etat, utilisateur: action.utilisateur };
    case 'deconnecter':
      return { ...etat, utilisateur: null };
    case 'modifier':
      // ex. modifier({ email }) après un changement d'email dans le Profil
      return { ...etat, utilisateur: { ...etat.utilisateur, ...action.changements } };
    case 'allerA':
      return { ...etat, ecran: action.ecran };
    default:
      return etat;
  }
}

// useContext : le contexte permet de lire l'utilisateur dans n'importe quel écran
// sans le passer en props à travers App → Drawer → Tabs → écran (prop drilling)
const UtilisateurContext = createContext(null);

export function UtilisateurProvider({ children }) {
  const [etat, dispatch] = useReducer(reducer, ETAT_DEPART);

  // useCallback : ces fonctions restent les mêmes d'un rendu à l'autre
  const connecter = useCallback((utilisateur) => dispatch({ type: 'connecter', utilisateur }), []);
  const deconnecter = useCallback(() => dispatch({ type: 'deconnecter' }), []);
  const modifier = useCallback((changements) => dispatch({ type: 'modifier', changements }), []);
  const allerA = useCallback((ecran) => dispatch({ type: 'allerA', ecran }), []);

  // useMemo : on ne recrée l'objet value que si l'état change,
  // sinon tous les écrans qui lisent le contexte se réafficheraient à chaque rendu
  const valeur = useMemo(
    () => ({ ...etat, connecter, deconnecter, modifier, allerA }),
    [etat, connecter, deconnecter, modifier, allerA]
  );

  return (
    <UtilisateurContext.Provider value={valeur}>
      {children}
    </UtilisateurContext.Provider>
  );
}

// Hook personnalisé : raccourci pour useContext(UtilisateurContext)
export function useUtilisateur() {
  const valeur = useContext(UtilisateurContext);
  if (!valeur) {
    throw new Error('useUtilisateur doit être utilisé à l\'intérieur de <UtilisateurProvider>');
  }
  return valeur;
}
