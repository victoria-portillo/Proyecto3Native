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
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5F866F',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default CambioClave;
