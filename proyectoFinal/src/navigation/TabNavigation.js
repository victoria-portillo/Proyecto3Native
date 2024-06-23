import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import PosteoNuevo from '../screens/PosteoNuevo'
import MiPerfil from '../screens/MiPerfil'
import Buscador from '../screens/Buscador'
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator >

        <Tab.Screen 
        name='Home' 
        component={Home}
        options={{
            headerShown: false,
            tabBarIcon: ()=> <FontAwesome5 name='home' size={24} color='black' />  }}
        />
      

  
<Tab.Screen 
        name='PosteoNuevo' 
        component={PosteoNuevo}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <FontAwesome5 name='plus' size={24} color='black' />

          
        }}
        />

<Tab.Screen 
        name='Buscador' 
        component={Buscador}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <FontAwesome5 name='search' size={24} color='black' />
        }}
        />

<Tab.Screen 
        name='MiPerfil' 
        component={MiPerfil}
        options={{
            headerShown:false,
            tabBarIcon: ()=> <FontAwesome5 name='user' size={24} color='black' />
        }}
        />
            </Tab.Navigator>
  )
}