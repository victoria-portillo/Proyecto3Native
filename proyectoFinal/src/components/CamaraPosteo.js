import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { storage } from '../firebase/config';

export default class CamaraPosteo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            abrirCamara: true,
            permisos: false,
            urlTemp: '',
        };
        this.metodosDeCamara = null;
    }

    async componentDidMount() {
        const { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ permisos: status === 'granted' });
    }

    tomarFoto = async () => {
        if (this.metodosDeCamara) {
            let foto = await this.metodosDeCamara.takePictureAsync();
            this.setState({ urlTemp: foto.uri, abrirCamara: false });
        }
    }

    aceptarFoto = () => {
        fetch(this.state.urlTemp)
            .then(resp => resp.blob())
            .then(img => {
                const ref = storage.ref(`fotos/${Date.now()}.jpg`);
                ref.put(img).then(() => {
                    ref.getDownloadURL().then(url => this.props.actualizarFotourl(url));
                });
            })
            .catch(err => console.log(err));
    }

    rechazarFoto = () => {
        this.setState({
            abrirCamara: true,
            urlTemp: ''
        });
    }

    render() {
        if (this.state.permisos === null) {
            return <View />;
        }
        if (this.state.permisos === false) {
            return <Text>No tienes permisos para usar la cámara</Text>;
        }
        return (
            <View style={styles.container}>
                {this.state.abrirCamara ? (
                    <>
                        <Camera
                            style={styles.camara}
                            type={Camera.Constants.Type.back}
                            ref={ref => this.metodosDeCamara = ref}
                        />
                        <TouchableOpacity onPress={this.tomarFoto}>
                            <Text style={styles.textoAceptar}>Tomar foto</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Image source={{ uri: this.state.urlTemp }} style={styles.img} resizeMode={'contain'} />
                        <TouchableOpacity onPress={this.aceptarFoto}>
                            <Text style={styles.textoAceptar}>Aceptar Foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.rechazarFoto}>
                            <Text style={styles.textoAceptar}>Rechazar Foto</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camara: {
        flex: 1,
        width: '100%',
    },
    img: {
        height: 500,
        width: 500,
    },
    textoAceptar: {
        backgroundColor: '#5F866F',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 15,
        textAlign: 'center',
    }
});
