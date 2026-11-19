import { useState, useEffect } from 'react';
import { Button, StatusBar, Text, TextInput, View, Image, StyleSheet, Switch, Alert, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Styles from '../src/style';
import { validerFormulaire } from '../utils/validation';
import { initDb, insererUtilisateur, listerUtilisateurs } from '../database';

const FORMULAIRE_VIDE = {
  nom: '', prenom: '', email: '', telephone: '', mdp: '', confirmation: '',
};

const champ = { backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 10 };
const label = { color: 'rgb(15, 15, 15)' };
const erreur = { color: '#DC2626', fontSize: 13 };

export default function Composant({ onSeConnecter }) {
  const [form, setForm] = useState(FORMULAIRE_VIDE);
  const [cgu, setCgu] = useState(false);
  const [erreurs, setErreurs] = useState({});

  useEffect(() => {
    initDb().catch((e) => console.log('Erreur init base', e));
  }, []);

  const maj = (nomChamp, valeur) => setForm((f) => ({ ...f, [nomChamp]: valeur }));

  const envoyer = async () => {
    const e = validerFormulaire(form, cgu);
    setErreurs(e);
    if (Object.keys(e).length > 0) return;
    try {
      await insererUtilisateur({ ...form, newsletter: false, cgu });
      Alert.alert('Inscription réussie', `Bienvenue ${form.prenom} ${form.nom} !`);
      console.log(await listerUtilisateurs());
      setForm(FORMULAIRE_VIDE);
      setCgu(false);
      setErreurs({});
    } catch (err) {
      if (String(err.message).includes('UNIQUE')) {
        setErreurs({ email: 'Cet email est déjà utilisé' });
      } else {
        Alert.alert('Erreur', "Impossible d'enregistrer l'utilisateur");
      }
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(228, 237, 234)' }}>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(15, 15, 15)" />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ backgroundColor: 'rgb(228, 237, 234)', padding: 10, borderRadius: 5 }}>
          <Text style={label}>Nom d'utilisateur</Text>
          <TextInput placeholder="Entrez votre nom d'utilisateur" placeholderTextColor="#9CA3AF"
            autoCapitalize="words" style={champ} value={form.nom} onChangeText={(t) => maj('nom', t)} />
          {erreurs.nom && <Text style={erreur}>{erreurs.nom}</Text>}

          <Text style={label}>Prénom</Text>
          <TextInput placeholder="Entrez votre prénom" placeholderTextColor="#9CA3AF"
            autoCapitalize="words" style={champ} value={form.prenom} onChangeText={(t) => maj('prenom', t)} />
          {erreurs.prenom && <Text style={erreur}>{erreurs.prenom}</Text>}

          <Text style={label}>Mot de passe</Text>
          <TextInput placeholder="Entrez votre mot de passe" secureTextEntry
            style={champ} value={form.mdp} onChangeText={(t) => maj('mdp', t)} />
          {erreurs.mdp && <Text style={erreur}>{erreurs.mdp}</Text>}

          <Text style={label}>Confirmer le mot de passe</Text>
          <TextInput placeholder="Confirmez votre mot de passe" secureTextEntry
            style={champ} value={form.confirmation} onChangeText={(t) => maj('confirmation', t)} />
          {erreurs.confirmation && <Text style={erreur}>{erreurs.confirmation}</Text>}

          <Text style={label}>Adresse e-mail</Text>
          <TextInput placeholder="Entrez votre adresse e-mail" keyboardType="email-address"
            autoCapitalize="none" autoCorrect={false}
            style={champ} value={form.email} onChangeText={(t) => maj('email', t)} />
          {erreurs.email && <Text style={erreur}>{erreurs.email}</Text>}

          <Text style={label}>Numéro de téléphone</Text>
          <TextInput placeholder="Entrez votre numéro de téléphone" keyboardType="phone-pad"
            style={champ} value={form.telephone} onChangeText={(t) => maj('telephone', t)} />
          {erreurs.telephone && <Text style={erreur}>{erreurs.telephone}</Text>}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={label}>J'accepte les CGU</Text>
            <Switch value={cgu} onValueChange={setCgu} />
          </View>
          {erreurs.cgu && <Text style={erreur}>{erreurs.cgu}</Text>}

          <View style={Styles.banniere}>
            <Image source={{ uri: 'https://picsum.photos/600/200' }} style={StyleSheet.absoluteFill} resizeMode="cover" />
            <Text style={Styles.titreBanniere}>Pls 20/20</Text>
          </View>

          <Button title="S'inscrire" color="rgb(15, 15, 15)" onPress={envoyer} />

          <Pressable onPress={onSeConnecter} style={{ alignItems: 'center', paddingVertical: 12 }}>
            <Text style={{ color: 'rgb(15, 15, 15)', fontWeight: '600' }}>Déjà inscrit ? Connecte-toi</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}