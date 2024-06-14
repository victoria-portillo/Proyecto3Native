import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default class FormularioLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            password: '',
            emailError: '',
            passwordError: '',
            generalError: '',
            allFieldsCompleted: false,
        };
    }

    actualizarEstadoCampos = () => {
        const { mail, password } = this.state;
        this.setState({ allFieldsCompleted: mail !== '' && password !== '' });
    };

    loguearUsuario = (mail, password) => {
       
        this.props.navigation.navigate('Home');
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
                        value={this.state.mail}
                        onChangeText={(text) => {
                            this.setState({ mail: text });
                            this.actualizarEstadoCampos();
                        }}
                    />
                    {this.state.emailError && (
                        <Text style={styles.errorMessage}>{this.state.emailError}</Text>
                    )}

                    <TextInput
                        style={styles.control}
                        placeholder="Ingresa tu contraseña"
                        keyboardType="default"
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({ password: text });
                            this.actualizarEstadoCampos();
                        }}
                    />
                    {this.state.passwordError && (
                        <Text style={styles.errorMessage}>{this.state.passwordError}</Text>
                    )}

                    {this.state.generalError && (
                        <Text style={styles.errorMessage}>{this.state.generalError}</Text>
                    )}

                    <TouchableOpacity
                        onPress={() => this.loguearUsuario(this.state.mail, this.state.password)}
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


