import { View, Text, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useUtilisateur } from '../context/UtilisateurContext';

const bouton = { backgroundColor: 'rgb(15, 15, 15)', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, marginTop: 12, minWidth: 220, alignItems: 'center' };
const boutonTexte = { color: 'white', fontWeight: '600' };

export const AccueilScreen = () => {
  // useNavigation : récupère l'objet navigation sans le recevoir en props
  const navigation = useNavigation();
  // useContext (via notre hook useUtilisateur) : l'utilisateur connecté
  const { utilisateur } = useUtilisateur();

  return (
    <View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(228, 237, 234)' }}
    >
      <AntDesign name="home" size={24} color="black" />
      <Text style={{ color: 'rgb(15, 15, 15)', marginBottom: 12 }}>
        Bienvenue sur l'accueil, {utilisateur.prenom}
      </Text>

      {/* navigate('Catalogue') : on va sur l'onglet Catalogue */}
      <Pressable style={bouton} onPress={() => navigation.navigate('Catalogue')}>
        <Text style={boutonTexte}>Voir le catalogue</Text>
      </Pressable>
      <Pressable style={bouton} onPress={() => navigation.navigate('Compte')}>
        <Text style={boutonTexte}>Mon compte</Text>
      </Pressable>
    </View>
  );
};
