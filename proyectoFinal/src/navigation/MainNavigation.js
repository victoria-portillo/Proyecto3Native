import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Registro from '../screens/Registro';
import TabNavigation from './TabNavigation';
import Login from '../screens/Login'
import Home from '../screens/Home'

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Registro' 
          component={Registro}
          options={{ headerShown: false }}
        />
      
      <Stack.Screen 
          name='Login' 
          component={Login}
          options={{ headerShown: false }}
        />
      <Stack.Screen 
          name='Home' 
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name='TabNavigation' 
          component={TabNavigation}
          options={{ headerShown: false }}
        />

</Stack.Navigator>
    </NavigationContainer>
  );
}
