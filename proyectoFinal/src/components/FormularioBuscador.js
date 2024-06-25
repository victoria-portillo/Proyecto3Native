import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default class FormularioBuscador extends Component {
  constructor(props) {
    super(props);
  }

  evitarSubmit(e) {
    e.preventDefault();
  }

  cambios(texto) {
    this.props.actualizarCampo(texto);
    this.props.usuariosFiltro(texto);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.busqueda}
          placeholder="Ingresa un usuario o correo para buscar"
          name="busqueda"
          onChangeText={(text) => this.cambios(text)}
        />
        <Button 
        style={styles.button}
          title="Buscar"
          onPress={(e) => this.evitarSubmit(e)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
  busqueda: {
    height: 40,
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
    width: '100%',
  },
  
  button: {
    backgroundColor: 'grey',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        minWidth: 120, 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
 