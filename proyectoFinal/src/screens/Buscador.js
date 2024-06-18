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
            <Text style={styles.text}>No se han encontrado resultados</Text>
        ) : (
          <Text style={styles.text}>Busca un usuario</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#9fc1ad',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    mensaje: {
        color: 'red',
        marginBottom: 10,
    },
    resultadoItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
});
