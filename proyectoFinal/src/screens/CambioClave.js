import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebase/config';
import firebase from 'firebase/app';
import 'firebase/auth';

const CambioClave = ({ navigation }) => {
  const [claveActual, setClaveActual] = useState('');
  const [nuevaClave, setNuevaClave] = useState('');

  const handleCambiarClave = async () => {
    try {
      const user = auth.currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(user.email, claveActual);
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(nuevaClave);

      Alert.alert('Contraseña actualizada con éxito');
      navigation.goBack(); 
    } catch (error) {
        console.error('Error en handleCambiarClave:', error);
        Alert.alert('Error al cambiar la contraseña', error.message);    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
      <Text style={styles.title}>Cambiar Contraseña</Text>
      <TextInput
        placeholder="Contraseña actual"
        secureTextEntry
        style={styles.input}
        value={claveActual}
        onChangeText={(text) => setClaveActual(text)}
      />
      <TextInput
        placeholder="Nueva contraseña"
        secureTextEntry
        style={styles.input}
        value={nuevaClave}
        onChangeText={(text) => setNuevaClave(text)}
      />
     <TouchableOpacity onPress={() => { 
        handleCambiarClave(); }} style={styles.button}>
        <Text>Cambiar Contraseña</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#9fc1ad',
  },
  container2:{
    marginVertical: 10,
    width: '50%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#5F866F',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default CambioClave;
