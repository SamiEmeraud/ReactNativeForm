import 'react-native-gesture-handler';
import { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Composant from './screens/InscriptionScreen';
import { LoginScreen } from './screens/LoginScreen';
import DrawerNavigator from './navigation/DrawerNavigator';

export default function App() {
  const [ecran, setEcran] = useState('inscription');
  const [utilisateur, setUtilisateur] = useState(null);

  // Connecté : menu Drawer (TP Drawer Menu)
  if (utilisateur) {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="rgb(15, 15, 15)" />
        {/* NavigationContainer gère les transitions entre les écrans */}
        <NavigationContainer>
          <DrawerNavigator
            utilisateur={utilisateur}
            onDeconnexion={() => setUtilisateur(null)}
            onModifie={setUtilisateur}
          />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }

  // Pas connecté : inscription ou connexion (TP Login)
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(15, 15, 15)" />
      {ecran === 'inscription'
        ? <Composant onSeConnecter={() => setEcran('login')} />
        : <LoginScreen onConnecte={setUtilisateur} onSInscrire={() => setEcran('inscription')} />}
    </SafeAreaProvider>
  );
}
