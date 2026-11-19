import { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import { validerEmail, validerMdp, validerConfirmation, validerMdpSaisi } from '../utils/validation';
import { modifierEmail, modifierMdp } from '../database';

// Même style que InscriptionScreen
const champ = { backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, padding: 10, marginVertical: 10 };
const label = { color: 'rgb(15, 15, 15)' };
const erreur = { color: '#DC2626', fontSize: 13 };
const titre = { fontSize: 18, fontWeight: '700', color: 'rgb(15, 15, 15)', marginTop: 24, marginBottom: 4 };

const MDP_VIDE = { ancien: '', nouveau: '', confirmation: '' };

export const ProfilScreen = ({ utilisateur, onDeconnexion, onModifie }) => {
  const [email, setEmail] = useState('');
  const [erreurEmail, setErreurEmail] = useState(null);
  const [mdp, setMdp] = useState(MDP_VIDE);
  const [erreursMdp, setErreursMdp] = useState({});

  const majMdp = (nomChamp, valeur) => setMdp((m) => ({ ...m, [nomChamp]: valeur }));

  const changerEmail = async () => {
    const e = validerEmail(email);
    setErreurEmail(e);
    if (e) return;
    try {
      await modifierEmail(utilisateur.id, email);
      // On met à jour l'utilisateur connecté pour afficher le nouvel email
      onModifie({ ...utilisateur, email: email.trim().toLowerCase() });
      setEmail('');
      Alert.alert('Email modifié', 'Votre adresse email a bien été changée.');
    } catch (err) {
      if (String(err.message).includes('UNIQUE')) {
        setErreurEmail('Cet email est déjà utilisé');
      } else {
        Alert.alert('Erreur', "Impossible de modifier l'email");
      }
      console.log(err);
    }
  };

  const changerMdp = async () => {
    const resultats = {
      ancien: validerMdpSaisi(mdp.ancien),
      nouveau: validerMdp(mdp.nouveau),
      confirmation: validerConfirmation(mdp.nouveau, mdp.confirmation),
    };
    const e = Object.fromEntries(
      Object.entries(resultats).filter(([, message]) => message !== null)
    );
    setErreursMdp(e);
    if (Object.keys(e).length > 0) return;
    try {
      const ok = await modifierMdp(utilisateur.id, mdp.ancien, mdp.nouveau);
      if (!ok) {
        setErreursMdp({ ancien: 'Mot de passe actuel incorrect' });
        return;
      }
      setMdp(MDP_VIDE);
      Alert.alert('Mot de passe modifié', 'Votre mot de passe a bien été changé.');
    } catch (err) {
      console.log(err);
      Alert.alert('Erreur', 'Impossible de modifier le mot de passe');
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'rgb(228, 237, 234)' }}
      contentContainerStyle={{ padding: 20 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ alignItems: 'center' }}>
        <Text style={{ marginBottom: 8 }}>Bienvenue sur votre profil</Text>
        <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 8 }}>
          {utilisateur.prenom} {utilisateur.nom}
        </Text>
        <Text>{utilisateur.email}</Text>
      </View>

      {/* Changer l'email */}
      <Text style={titre}>Changer d'adresse e-mail</Text>
      <Text style={label}>Nouvelle adresse e-mail</Text>
      <TextInput placeholder="Entrez votre nouvelle adresse e-mail" placeholderTextColor="#9CA3AF"
        keyboardType="email-address" autoCapitalize="none" autoCorrect={false}
        style={champ} value={email} onChangeText={setEmail} />
      {erreurEmail && <Text style={erreur}>{erreurEmail}</Text>}
      <Button title="Changer l'e-mail" color="rgb(15, 15, 15)" onPress={changerEmail} />

      {/* Changer le mot de passe */}
      <Text style={titre}>Changer de mot de passe</Text>
      <Text style={label}>Mot de passe actuel</Text>
      <TextInput placeholder="Entrez votre mot de passe actuel" placeholderTextColor="#9CA3AF" secureTextEntry
        style={champ} value={mdp.ancien} onChangeText={(t) => majMdp('ancien', t)} />
      {erreursMdp.ancien && <Text style={erreur}>{erreursMdp.ancien}</Text>}

      <Text style={label}>Nouveau mot de passe</Text>
      <TextInput placeholder="Entrez votre nouveau mot de passe" placeholderTextColor="#9CA3AF" secureTextEntry
        style={champ} value={mdp.nouveau} onChangeText={(t) => majMdp('nouveau', t)} />
      {erreursMdp.nouveau && <Text style={erreur}>{erreursMdp.nouveau}</Text>}

      <Text style={label}>Confirmer le nouveau mot de passe</Text>
      <TextInput placeholder="Confirmez votre nouveau mot de passe" placeholderTextColor="#9CA3AF" secureTextEntry
        style={champ} value={mdp.confirmation} onChangeText={(t) => majMdp('confirmation', t)} />
      {erreursMdp.confirmation && <Text style={erreur}>{erreursMdp.confirmation}</Text>}
      <Button title="Changer le mot de passe" color="rgb(15, 15, 15)" onPress={changerMdp} />

      <View style={{ marginTop: 32 }}>
        <Button title="Se déconnecter" color="rgb(15, 15, 15)" onPress={onDeconnexion} />
      </View>
    </ScrollView>
  );
};
