import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';
import TabNavigation from '../navigation/TabNavigation';

export default class FormularioLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correo: '',
            clave: '',
            errorCorreo: '',
            claveError: '',
            generalError: '',
            allFieldsCompleted: false,
        };
    }

    loguearUsuario = (correo, clave) => {
        this.setState({
            errorCorreo: '',
            claveError: '',
            generalError: '',
        });

        if (!correo || !clave) {
            this.setState({ generalError: 'Por favor, completa todos los campos.' });
        } else {
            auth
                .signInWithEmailAndPassword(correo, clave)
                .then((user) => {
                    this.props.navigation.navigate(TabNavigation);
                })
                .catch((error) => {
                    if (error.code === 'auth/invalid-email') {
                        this.setState({ errorCorreo: 'El correo electrónico es incorrecto.' });
                    } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                        this.setState({ claveError: 'Contraseña incorrecta. Por favor, inténtalo de nuevo.' });
                    } else {
                        this.setState({ generalError: 'Error al iniciar sesión. Por favor, inténtalo de nuevo.' });
                    }
                });
        }
    };

    actualizarEstadoCampos = () => {
        const { correo, clave } = this.state;
        this.setState({ allFieldsCompleted: correo !== '' && clave !== '' });
    };

    render() {
        return (
            <View style={styles.productswrapper}>
                <Text style={styles.productstitle}>Inicia Sesión</Text>
                <View style={styles.registro}>
                    <TextInput
                        style={styles.control}
                        placeholder="Ingresa tu email"
                        keyboardType="email-address"
                        value={this.state.correo}
                        onChangeText={(text) => {
                            this.setState({ correo: text });
                            this.actualizarEstadoCampos();
                        }}
                    />
                    {this.state.errorCorreo && (
                        <Text style={styles.errorMessage}>{this.state.errorCorreo}</Text>
                    )}

                    <TextInput
                        style={styles.control}
                        placeholder="Ingresa tu contraseña"
                        keyboardType="default"
                        value={this.state.clave}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({ clave: text });
                            this.actualizarEstadoCampos();
                        }}
                    />
                    {this.state.claveError && (
                        <Text style={styles.errorMessage}>{this.state.claveError}</Text>
                    )}

                    {this.state.generalError && (
                        <Text style={styles.errorMessage}>{this.state.generalError}</Text>
                    )}

                    <TouchableOpacity
                        onPress={() => this.loguearUsuario(this.state.correo, this.state.clave)}
                        disabled={!this.state.allFieldsCompleted}
                        style={[
                            styles.button,
                            !this.state.allFieldsCompleted && styles.buttonDisabled,
                        ]}
                    >
                        <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
                    </TouchableOpacity>

                    <Text style={styles.textLink}>
                        ¿Aún no tienes una cuenta?{' '}
                        <Text
                            style={styles.textLinkBold}
                            onPress={() => this.props.navigation.navigate('Registro')}
                        >
                            Registrarse
                        </Text>
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    productswrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productstitle: {
        fontSize: 24,
        marginBottom: 20,
    },
    registro: {
        width: '80%',
    },
    control: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonDisabled: {
        backgroundColor: '#aaa',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    textLink: {
        textAlign: 'center',
        marginTop: 20,
    },
    textLinkBold: {
        fontWeight: 'bold',
        color: '#007bff',
    },
});