import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import TabNavigator from './TabNavigator';
import { ProfilScreen } from '../screens/ProfilScreen';
import { ProduitsScreen } from '../screens/ProduitsScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ utilisateur, onDeconnexion, onModifie }) {
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
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      >
        {() => <TabNavigator utilisateur={utilisateur} onDeconnexion={onDeconnexion} onModifie={onModifie} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Produits"
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      >
        {() => <ProduitsScreen utilisateur={utilisateur} onDeconnexion={onDeconnexion} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Profil"
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      >
        {() => <ProfilScreen utilisateur={utilisateur} onDeconnexion={onDeconnexion} onModifie={onModifie} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
