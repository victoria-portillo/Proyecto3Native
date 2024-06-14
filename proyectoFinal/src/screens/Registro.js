import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';import FormularioRegistro from '../components/FormularioRegistro';
import CamaraPosteo from '../components/CamaraPosteo';

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
        if (nombre === '') {
            this.setState({
                errores: { ...this.state.errores, errorNombre: 'Ingresa un nombre válido' },
            });
        } else if (correo === '' || !correo.includes('@')) {
            this.setState({
                errores: { ...this.state.errores, errorCorreo: 'Verifica que el correo electrónico sea válido' },
            });
        } else if (clave === '' || clave.length < 6) {
            this.setState({
                errores: { ...this.state.errores, errorClave: 'La contraseña no puede estar vacía y debe tener más de 6 caracteres' },
            });
        } else {
            auth.createUserWithEmailAndPassword(correo, clave)
                .then((user) => {
                    db.collection('usuarios')
                        .add({
                            owner: correo,
                            createdAt: Date.now(),
                            nombre: nombre,
                            biografia: this.state.biografia,
                            fotoPerfil: this.state.fotoPerfil
                        })
                        .then((resp) => {
                            this.setState({
                                usuarioId: resp.id,
                                paso1:false,
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
                            });
                        })
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({ correoExiste: err.message });
                });
        }
    };

    actualizarFotourl = (url) => {
        this.setState({ fotoPerfil: url }, () => {
            console.log('state log', this.state)
            this.guardarImagen(url);
        });
    };

    abrirCamara = () => {
        if (this.state.nombre === '') {
            this.setState({
                errores: { ...this.state.errores, errorNombre: 'Ingresa un nombre válido' },
            });
        } else if (this.state.correo === '' || !this.state.correo.includes('@')) {
            this.setState({
                errores: { ...this.state.errores, errorCorreo: 'Verifica que el correo electrónico sea válido' },
            });
        } else if (this.state.clave === '' || this.state.clave.length < 6) {
            this.setState({
                errores: { ...this.state.errores, errorClave: 'La contraseña no puede estar vacía y debe tener más de 6 caracteres' },
            });
        } else {
            this.registrarUsuario(this.state.nombre, this.state.correo, this.state.clave, false);
            this.setState({ paso1: false });
        }
    }

    guardarImagen = (url) => {
        db.collection('usuarios')
            .doc(this.state.usuarioId)
            .update({ fotoPerfil: url })
            .then(() => {
                this.setState({ fotoPerfil: '' }, () => {
                    this.props.navigation.navigate('TabNavigation');
                });
            })
            .catch((err) => console.log(err));
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.paso1 ? (
                    <FormularioRegistro
                        state={this.state}
                        handleInputChange={(field, value) => this.setState({ [field]: value })}
                        registrarUsuario={this.registrarUsuario}
                        abrirCamara={this.abrirCamara}
                        navigation={this.props.navigation}
                    />
                ) : (
                    <CamaraPosteo
                        actualizarFotourl={this.actualizarFotourl}
                        guardarImagen={this.guardarImagen}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#9fc1ad',
        textAlign: 'center',
    },
});
