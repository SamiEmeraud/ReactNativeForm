import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AccueilScreen } from '../screens/AccueilScreen';
import { ProduitsScreen } from '../screens/ProduitsScreen';
import { ProfilScreen } from '../screens/ProfilScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: 'rgb(15, 15, 15)',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Accueil') {
            iconName = 'home';
          } else if (route.name === 'Catalogue') {
            iconName = 'appstore';
          } else if (route.name === 'Compte') {
            iconName = 'user';
          }
          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Accueil" component={AccueilScreen} />
      <Tab.Screen name="Catalogue" component={ProduitsScreen} />
      <Tab.Screen name="Compte" component={ProfilScreen} />
    </Tab.Navigator>
  );
}
