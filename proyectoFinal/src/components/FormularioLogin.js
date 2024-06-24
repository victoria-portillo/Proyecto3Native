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
            generalError: '',
            allFieldsCompleted: false,
        };
    }

    loguearUsuario = (correo, clave) => {
        this.setState({
            errorCorreo: '',
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
                    } else {
                        this.setState({ generalError: 'La contraseña es incorrecta.' });
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
                        style={styles.input}
                        placeholder="Ingresa tu email"
                        placeholderTextColor="#888"
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
                        style={styles.input}
                        placeholder="Ingresa tu contraseña"
                        placeholderTextColor="#888"
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
        styles.btn,
        !this.state.allFieldsCompleted && styles.btnDisabled,
    ]}
>
    <Text style={styles.textBtn}>INICIAR SESIÓN</Text>
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
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    btnDisabled: {
        backgroundColor: '#aaa',
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