import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image, Modal, Pressable } from 'react-native';
import { auth, db } from '../firebase/config';
import Posteo from '../components/Posteo';

export default class MiPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      posteos: [],
      seleccionPosteoId: null,
      modalVisible: false,
    };
  }

  componentDidMount() {
    db.collection('usuarios')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let datos = [];
        docs.forEach((doc) => {
          datos.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        this.setState({
          usuarios: datos,
        });
      });

    db.collection('posteos')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let datos = [];
        docs.forEach((doc) => {
          datos.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        datos.sort((a, b) => b.data.createdAt - a.data.createdAt);
        this.setState({
          posteos: datos,
        });
      });
  }

  confirmarEliminacion = async (posteoId) => {
    try {
      await db.collection('posteos').doc(posteoId).delete();
      console.log('Posteo eliminado correctamente');

      // Actualizar el estado después de borrar el posteo
      const updatedPosteos = this.state.posteos.filter(post => post.id !== posteoId);
      this.setState({
        posteos: updatedPosteos,
        modalVisible: false,
      });
    } catch (error) {
      console.error('Error al eliminar el posteo:', error);
    }
  }

  borrarPosteo = (posteoId) => {
    // Mostrar el modal de confirmación
    this.setState({
      seleccionPosteoId: posteoId,
      modalVisible: true,
    });
  }

  cerrarModal = () => {
    // Cerrar el modal sin borrar el posteo
    this.setState({
      seleccionPosteoId: null,
      modalVisible: false,
    });
  }

  logout = () => {
    auth.signOut();
    this.props.navigation.navigate('Login');
  }

  handleChangePassword = () => {
    this.props.navigation.navigate('CambioClave');
  };

  handleEditProfile = () => {
    this.props.navigation.navigate('EditarPerfil');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tu perfil</Text>
        <FlatList
          data={this.state.usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.profileInfo}>
              <Image source={{ uri: item.data.fotoPerfil }} style={styles.profileImage} />
              <Text style={styles.username}>{item.data.nombre}</Text>
              <Text style={styles.mail}>{item.data.owner}</Text>
              <Text style={styles.minibio}>{item.data.biografia}</Text>
              <TouchableOpacity style={styles.editProfileButton} onPress={this.handleEditProfile}>
                <Text style={styles.editProfileButtonText}>Editar Perfil</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <Text style={styles.title}>Tus posteos</Text>
        <Text style={styles.cantidadPosteos}>Cantidad de posteos: {this.state.posteos.length}</Text>
        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Posteo navigation={this.props.navigation} data={item.data} id={item.id} />
              <TouchableOpacity style={styles.deleteButton} onPress={() => this.borrarPosteo(item.id)}>
                <Text style={styles.deleteButtonText}>Borrar</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity style={styles.changePasswordButton} onPress={this.handleChangePassword}>
          <Text style={styles.buttonText}>Cambiar Contraseña</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={this.logout}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.cerrarModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>¿Estás seguro de que quieres borrar este posteo?</Text>
              <View style={styles.modalButtons}>
                <Pressable style={[styles.button, styles.buttonClose]} onPress={this.cerrarModal}>
                  <Text style={styles.textStyle}>Cancelar</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.buttonConfirm]} onPress={() => this.confirmarEliminacion(this.state.seleccionPosteoId)}>
                  <Text style={styles.textStyle}>Borrar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  mail: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  minibio: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
    textAlign: 'center',
  },
  editProfileButton: {
    backgroundColor: '#5F866F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  editProfileButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  posts: {
    flex: 1,
  },
  cantidadPosteos: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  post: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  changePasswordButton: {
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
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#FF6347',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 25,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonConfirm: {
    backgroundColor: '#FF6347',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
