import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Registro from '../screens/Registro';
import TabNavigation from './TabNavigation';
import PosteoNuevo from '../screens/PosteoNuevo';


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
          name='TabNavigation' 
          component={TabNavigation}
          options={{ headerShown: false }}
        />
        

</Stack.Navigator>
    </NavigationContainer>
  );
}
