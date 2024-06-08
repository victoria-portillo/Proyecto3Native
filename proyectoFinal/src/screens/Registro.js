import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { auth, db } from '../firebase/config';
import formularioRegistro from '../components/formularioRegistro';
import CameraPost from '../components/CameraPost';


export default class Registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      correo: '',
      clave: '',
      biografia: '',
      fotoPerfil: '',
      errores: {
        errorNombre: '',
        errorClave: '',
        errorCorreo: '',
      },
      correoExiste: '',
      paso1: true,
      usuarioId: ''
    };
  }

  registrarUsuario = (nombre, correo, clave, redirigir) => {
    if (this.state.nombre === '') {
      this.setState({
        errores: {
          ...this.state.errores,
          errorNombre: 'Ingresa un nombre válido',
        },
      });
    } else if (this.state.correo === '' || this.state.correo.includes('@') === false) {
      this.setState({
        errores: {
          ...this.state.errores,
          errorCorreo: 'Verifica que el correo electrónico sea válido',
        },
      });
    } else if (this.state.clave === '' || this.state.clave.length < 6) {
      this.setState({
        errores: {
          ...this.state.errores,
          errorClave: 'La contraseña no puede estar vacía y debe tener más de 6 caracteres',
        },
      });
    } else {
      auth
      .createUserWithEmailAndPassword(correo, clave)
      .then((user) => {
        db.collection('usuarios')
          .add({
            owner: this.state.correo,
            createdAt: Date.now(),
            nombre: this.state.nombre,
            biografia: this.state.biografia,
            fotoPerfil: this.state.fotoPerfil
          })
          .then((resp) => {
            this.setState({
              usuarioId: resp.id,
              nombre: '',
              correo: '',
              clave: '',
              biografia: '',
              fotoPerfil: '',
              errores: {
                errorNombre: '',
                errorClave: '',
                errorCorreo: '',
              },
              correoExiste: '',
            }, () => {
              if (redirigir) {
                this.props.navigation.navigate('TabNavigation');
              }
            });
          })
      })
      .catch((err) => {
        console.log(err);
        this.setState({ correoExiste: err.message });
      });
    };
  };

  actualizarFotourl(url) {
    this.setState({
      fotoPerfil: url,
      paso1: true
    }, () => { this.saveImg(this.state.fotoPerfil), console.log(this.state.paso1) })

  }
  abrirCamara() {
    if (this.state.nombre === '') {
      this.setState({
        errores: {
          ...this.state.errores,
          errorNombre: 'Ingresa un nombre válido',
        },
      });
    } else if (this.state.correo === '' || this.state.correo.includes('@') === false) {
      this.setState({
        errores: {
          ...this.state.errores,
          errorCorreo: 'Verifica que el correo electrónico sea válido',
        },
      });
    } else if (this.state.clave === '' || this.state.clave.length < 6) {
      this.setState({
        errores: {
          ...this.state.errores,
          errorClave: 'La contraseña no puede estar vacía y debe tener más de 6 caracteres',
        },
      });
    } else {
      this.registrarUsuario(this.state.nombre, this.state.correo, this.state.clave, false)
      this.setState({
        paso1: false
      })
    }
  }

  guardarImgen(url) {
    console.log('usa el save')
    db
      .collection('usuarios')
      .doc(this.state.usuarioId)
      .update({
        fotoPerfil: url
      })
      .then((resp) => {
        this.setState({
          fotoPerfil: '',
        },()=> this.props.navigation.navigate('TabNavigation'))
      })
      .catch((err) => console.log(err))
  }

  render() {
    
    return (
      <View style={styles.container}>
        {this.state.step1 ?
          <formularioRegistro
            state={this.state}
            handleInputChange={(field, value) => this.setState({ [field]: value })}
            registrarUsuario={(nombre, correo, clave, redirigir) => this.registrarUsuario(nombre, correo, clave, redirigir)}
            abrirCamara={() => this.abrirCamara()}
            navigation={this.props.navigation}
          />
          :
          <CameraPost
            actualizarFotourl={(url) => this.actualizarFotourl(url)}
            guardarImagen={(url) => this.guardarImagen(url)} />
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#9fc1ad',
    textAlign: 'center'
  },
});