import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import TabNavigator from './TabNavigator';
import { ProfilScreen } from '../screens/ProfilScreen';
import { ProduitsScreen } from '../screens/ProduitsScreen';

const Drawer = createDrawerNavigator();

// Grâce au contexte, les écrans n'ont plus besoin de props :
// on peut utiliser component={...} directement
export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Menu Principal"
      screenOptions={{
        headerStyle: { backgroundColor: 'rgb(15, 15, 15)' },
        headerTintColor: 'white',
        drawerActiveTintColor: 'rgb(15, 15, 15)',
        drawerStyle: { backgroundColor: 'rgb(228, 237, 234)' },
      }}
    >
      <Drawer.Screen
        name="Menu Principal"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Produits"
        component={ProduitsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profil"
        component={ProfilScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
