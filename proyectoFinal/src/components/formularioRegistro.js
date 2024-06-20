import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

class FormularioRegistro extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      nombre,
      correo,
      clave,
      biografia,
      errores,
      correoExiste,
    } = this.props.state;

    return (
      <View>
        <Text style={styles.title}>Regístrate en Travelgram</Text>
        <View>
   
          {errores.errorNombre !== '' && (
            <Text style={styles.errorText}>{errores.errorNombre}</Text>
          )}
<TextInput
  style={styles.input}
  placeholder="Ingresar nombre de usuario"
  placeholderTextColor="#888"
  keyboardType="default"
  onChangeText={(text) =>
    this.props.handleInputChange('nombre', text)
  }
/>
<TextInput
  style={styles.input}
  placeholder="Ingrese su correo electrónico"
  placeholderTextColor="#888"
  keyboardType="email-address"
  onChangeText={(text) =>
    this.props.handleInputChange('correo', text)
  }
/>
<TextInput
  style={styles.input}
  placeholder="Crea una biografía para tu perfil"
  placeholderTextColor="#888"
  keyboardType="default"
  value={biografia}
  onChangeText={(text) =>
    this.props.handleInputChange('biografia', text)
  }
/>
<TextInput
  style={styles.input}
  placeholder="Ingresa una contraseña"
  placeholderTextColor="#888"
  keyboardType="default"
  value={clave}
  secureTextEntry={true}
  onChangeText={(text) =>
    this.props.handleInputChange('clave', text)
  }
/>
          {errores.errorClave !== '' && (
            <Text style={styles.errorText}>{errores.errorClave}</Text>
          )}

          <Text style={styles.textLink}>
            ¿Ya tienes una cuenta?
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <Text style={styles.link}> Iniciar sesión </Text>
            </TouchableOpacity>
          </Text>

          {clave !== '' && correo !== '' && nombre !== '' && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => this.props.registrarUsuario(nombre, correo, clave, true)}
                style={styles.btn}
              >
                <Text style={styles.textBtn}>Regístrarme</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  btn: {
    backgroundColor: '#5F866F',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 30,
  },
  textBtn: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textLink: {
    marginTop: 20,
    textAlign: 'center',
    color: '#777',
  },
  link: {
    color: '#5F866F',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default FormularioRegistro;
