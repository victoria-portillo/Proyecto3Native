import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import PosteoNuevo from '../screens/PosteoNuevo'
import MiPerfil from '../screens/MiPerfil'


const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator >
        <Tab.Screen 
        name='Home' 
        component={Home}
        options={{
            headerShown:false        }}
        />

<Tab.Screen 
        name='PosteoNuevo' 
        component={PosteoNuevo}
        options={{
            headerShown:false
        }}
        />

<Tab.Screen 
        name='MiPerfil' 
        component={MiPerfil}
        options={{
            headerShown:false
        }}
        />
            </Tab.Navigator>
  )
}