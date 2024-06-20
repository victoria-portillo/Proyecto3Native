import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FormularioBuscador from '../components/FormularioBuscador';
import { db, auth } from '../firebase/config';

export default class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      backup: [],
      valor: ''
    };
  }

  componentDidMount() {
    db.collection('usuarios').onSnapshot((docs) => {
      let usuarios = [];
      docs.forEach((doc) => {
        usuarios.push({ id: doc.id, data: doc.data() });
      });
      this.setState({ usuarios, backup: usuarios });
    });
  }

  usuariosFiltro(nombre) {
    let usuariosFiltrados = this.state.backup.filter((elm) => {
      const lowercaseNombre = elm.data.nombre ? elm.data.nombre.toLowerCase() : '';
      const lowercaseOwner = elm.data.owner ? elm.data.owner.toLowerCase() : '';
  
      return (
        lowercaseNombre.includes(nombre.toLowerCase()) ||
        lowercaseOwner.includes(nombre.toLowerCase())
      );
    });
  
    this.setState({
      usuarios: usuariosFiltrados,
    });
  }
  
  actualizarCampo(valor) {
    this.setState({
      valor: valor
    });
  }

  irAlPerfil(owner) {
    owner == auth.currentUser.email ?
      this.props.navigation.navigate('MiPerfil')
      :
      this.props.navigation.navigate('Usuario', { user: owner })
  }

  render() {
    return (
      <View style={styles.container}>
        <FormularioBuscador usuariosFiltro={(nombre) => this.usuariosFiltro(nombre)} actualizarCampo={(valor) => this.actualizarCampo(valor)} />
        {this.state.valor != '' ? (
          this.state.usuarios.length != 0 ?
            <FlatList
              data={this.state.usuarios}
              renderItem={({ item }) =>
                <View style={styles.usuarioItem}>
                  <TouchableOpacity onPress={() => this.irAlPerfil(item.data.owner)}>
                    <Text style={styles.userName}>{item.data.nombre}</Text>
                    <Text style={styles.userOwner}>{item.data.owner}</Text>
                  </TouchableOpacity>
                </View>}
              keyExtractor={(item) => item.id.toString()}
            />
            :
            <Text style={styles.placeholderText}>No se han encontrado resultados</Text>
        ) : (
          <Text style={styles.placeholderText}>Busca un usuario</Text>
        )}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center', // Centramos el contenido horizontalmente
  },
  usuarioItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userOwner: {
    fontSize: 16,
    color: '#777',
  },
  noResultsText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  placeholderText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});