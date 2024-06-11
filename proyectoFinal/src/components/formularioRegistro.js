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
          <TextInput
            style={styles.input}
            placeholder="Ingresar nombre de usuario"
            placeholderTextColor="white"
            keyboardType="default"
            onChangeText={(text) =>
              this.props.handleInputChange('nombre', text)
            }
          />
          {errores.errorNombre !== '' && (
            <Text style={styles.errorText}>{errores.errorNombre}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Ingrese su correo electrónico"
            placeholderTextColor="white"
            keyboardType="email-address"
            onChangeText={(text) =>
              this.props.handleInputChange('correo', text)
            }
          />
          {errores.errorCorreo !== '' && (
            <Text style={styles.errorText}>{errores.errorCorreo}</Text>
          )}
          {correoExiste !== '' && (
            <Text style={styles.errorText}>{correoExiste}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Crea una biografia para tu perfil"
            keyboardType="default"
            value={biografia}
            onChangeText={(text) =>
              this.props.handleInputChange('biografia', text)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Ingresa una contraseña"
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
  },
  btn: {
    backgroundColor: '#5F866F',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  textBtn: {
    color: 'white',
    fontWeight: 'bold',
  },
  textLink: {
    marginTop: 20,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default FormularioRegistro;
