import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Composant from './screens/InscriptionScreen';
import { LoginScreen } from './screens/LoginScreen';
import DrawerNavigator from './navigation/DrawerNavigator';
import { UtilisateurProvider, useUtilisateur } from './context/UtilisateurContext';

// Le Provider doit être AU-DESSUS du composant qui appelle useUtilisateur,
// donc App ne fait qu'envelopper Contenu
export default function App() {
  return (
    <UtilisateurProvider>
      <Contenu />
    </UtilisateurProvider>
  );
}

function Contenu() {
  // ecran et utilisateur viennent du contexte (géré par useReducer)
  const { ecran, utilisateur, connecter, allerA } = useUtilisateur();

  // Connecté : menu Drawer (TP Drawer Menu)
  if (utilisateur) {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="rgb(15, 15, 15)" />
        {/* NavigationContainer gère les transitions entre les écrans */}
        <NavigationContainer>
          {/* Plus besoin de passer utilisateur en props : les écrans le lisent avec useUtilisateur() */}
          <DrawerNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }

  // Pas connecté : inscription ou connexion (TP Login)
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(15, 15, 15)" />
      {ecran === 'inscription'
        ? <Composant onSeConnecter={() => allerA('login')} />
        : <LoginScreen onConnecte={connecter} onSInscrire={() => allerA('inscription')} />}
    </SafeAreaProvider>
  );
}
