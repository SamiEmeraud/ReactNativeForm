import { useState, useEffect } from 'react';
import { Button, StatusBar, Text, TextInput, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validerFormulaireLogin } from '../utils/validation';
import { initDb, verifierConnexion } from '../database';

// Même style que InscriptionScreen
const champ = { backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 10 };
const label = { color: 'rgb(15, 15, 15)' };
const erreur = { color: '#DC2626', fontSize: 13 };

export const LoginScreen = ({ onConnecte, onSInscrire }) => {
  const [form, setForm] = useState({ email: '', mdp: '' });
  const [erreurs, setErreurs] = useState({});
  const [erreurGenerale, setErreurGenerale] = useState(null);

  useEffect(() => {
    initDb().catch((e) => console.log('Erreur init base', e));
  }, []);

  const maj = (nomChamp, valeur) => setForm((f) => ({ ...f, [nomChamp]: valeur }));

  const seConnecter = async () => {
    setErreurGenerale(null);
    const e = validerFormulaireLogin(form);
    setErreurs(e);
    if (Object.keys(e).length > 0) return;
    try {
      const utilisateur = await verifierConnexion(form.email, form.mdp);
      if (!utilisateur) {
        setErreurGenerale('Email ou mot de passe incorrect');
        return;
      }
      onConnecte(utilisateur);
    } catch (err) {
      console.log(err);
      setErreurGenerale('Connexion impossible, veuillez réessayer');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(228, 237, 234)' }}>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(15, 15, 15)" />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ backgroundColor: 'rgb(228, 237, 234)', padding: 10, borderRadius: 5 }}>
          <Text style={label}>Adresse e-mail</Text>
          <TextInput placeholder="Entrez votre adresse e-mail" placeholderTextColor="#9CA3AF"
            keyboardType="email-address" autoCapitalize="none" autoCorrect={false}
            style={champ} value={form.email} onChangeText={(t) => maj('email', t)} />
          {erreurs.email && <Text style={erreur}>{erreurs.email}</Text>}

          <Text style={label}>Mot de passe</Text>
          <TextInput placeholder="Entrez votre mot de passe" placeholderTextColor="#9CA3AF" secureTextEntry
            style={champ} value={form.mdp} onChangeText={(t) => maj('mdp', t)} />
          {erreurs.mdp && <Text style={erreur}>{erreurs.mdp}</Text>}

          {erreurGenerale && <Text style={[erreur, { marginBottom: 10 }]}>{erreurGenerale}</Text>}

          <Button title="Se connecter" color="rgb(15, 15, 15)" onPress={seConnecter} />

          <Pressable onPress={onSInscrire} style={{ alignItems: 'center', paddingVertical: 12 }}>
            <Text style={{ color: 'rgb(15, 15, 15)', fontWeight: '600' }}>C'est ta première fois ? Inscris-toi</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
