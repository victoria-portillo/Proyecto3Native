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
          placeholder="Búsqueda"
          name="busqueda"
          onChangeText={(text) => this.cambios(text)}
        />
        <Button style={styles.button}
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
    },
    busqueda: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      width: '100%',
    },
    button: {
      backgroundColor: '#5F866F',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 10,
  },
  });