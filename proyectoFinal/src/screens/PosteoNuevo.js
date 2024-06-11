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
  
    onSubmit({
      descripcion,
      fotoUrl
    }){
      db.collection('posteos').add(
        {
          owner: auth.currentUser.email,
          createdAt:Date.now(),
          fotoUrl:fotoUrl,
          descripcion:descripcion,
          likes:[]
        }
      )
      .then(() => this.props.navigation.navigate('Home'))
      .catch((e) => console.log(e))
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
                onPress={() => this.onSubmit({
                  descripcion: this.state.descripcion,
                  fotoUrl: this.state.urlFoto
                })}
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
      padding: 16,
      backgroundColor: '#9fc1ad',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    button: {
      backgroundColor: 'blue',
      padding: 12,
      borderRadius: 8,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 8,
      padding: 8,
      marginBottom: 16,
    },
    cameraContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  
    },
    imagePreview: {
      width: 500,
      height: 500,
      marginBottom: 16,
    },
    descriptionInput: {
      flex: 1,
      width: '50%',
      height: '50%',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      marginBottom: 20,
    },
    submitButton: {
      backgroundColor: '#5F866F',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    submitButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });