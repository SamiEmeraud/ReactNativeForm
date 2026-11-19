import { View, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export const AccueilScreen = () => {
  return (
    <View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(228, 237, 234)' }}
    >
      <AntDesign name="home" size={24} color="black" />
      <Text style={{ color: 'rgb(15, 15, 15)' }}>Bienvenue sur l'accueil</Text>
    </View>
  );
};
