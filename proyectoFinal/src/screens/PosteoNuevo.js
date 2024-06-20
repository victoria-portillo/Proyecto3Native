import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import CamaraPosteo from '../components/CamaraPosteo';

export default class PosteoNuevo extends Component {
  constructor(props){
    super(props)
    this.state = {
      descripcion:'',
      urlFoto:'',
      paso1:true
    }
  }

  onSubmit(){
    const { descripcion, urlFoto } = this.state;
    db.collection('posteos').add({
      owner: auth.currentUser.email,
      createdAt: Date.now(),
      fotoUrl: urlFoto,
      descripcion: descripcion,
      likes:[]
    })
    .then(() => {
      this.setState({
        descripcion:'',
        urlFoto:'',
        paso1:true
      });
      this.props.navigation.navigate('Home');
    })
    .catch((error) => console.error("Error al enviar el posteo:", error));
  }

  actualizarDescripcion(text){
    this.setState({
      descripcion: text
    })
  }

  actualizarFotourl(url){
    this.setState({
      urlFoto: url,
      paso1: false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nuevo Posteo</Text>
        {
          this.state.paso1 ?
            <View style={styles.cameraContainer}>
              <CamaraPosteo
                actualizarFotourl={(url) => this.actualizarFotourl(url)}
              />
            </View>
          :
          <>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Descripción"
              onChangeText={(descripcion) => this.actualizarDescripcion(descripcion)}
              value={this.state.descripcion}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.onSubmit()}
            >
              <Text style={styles.submitButtonText}>Enviar</Text>
            </TouchableOpacity>
          </>
        }
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  cameraContainer: {
    width: '100%',
    height: 600, // Ajustamos la altura para que no sea demasiado grande

    aspectRatio: 1, // Esto mantiene la relación de aspecto
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  descriptionInput: {
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
  submitButton: {
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
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
