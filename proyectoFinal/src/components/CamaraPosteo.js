import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera/legacy'
import { storage } from '../firebase/config'

export default class CamaraPosteo extends Component {
    constructor(props){
        super(props)
        this.state = {
            mostrarCamara: true,
            permisos:false,
            urlTemp:'',
        }
        this.metodosDeCamara = null  
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then((resp)=> this.setState({permisos: true}))
        .catch((err) => console.log(err))
    }

    tomarFoto(){
        this.metodosDeCamara.takePictureAsync()
        .then(imgTemp => this.setState({
            urlTemp: imgTemp.uri,
            mostrarCamara: false
        }))
        .catch(err => console.log(err))
    }

    aceptarFoto(){
        fetch(this.state.urlTemp)
        .then(resp => resp.blob())
        .then(img => {
            const ref = storage.ref(`fotos/${Date.now()}.jpg`)
            ref.put(img)
            .then(resp =>{
                ref.getDownloadURL()
                .then((url)=> this.props.actualizarFotourl(url))
                this.props.onFotoSubida();

            })
            .catch(err => console.log(err))
        })
        .catch(err=> console.log(err))

    }

    rechazarFoto(){
        this.setState({
            mostrarCamara: true,
            urlTemp: ''
        })
    }

  render() {
    return (
      <View style={styles.container}>
        {
            this.state.permisos && this.state.mostrarCamara ?
            <>
                <Camera
                    style= {styles.camaraContainer}
                    type={Camera.Constants.Type.back}
                    ref={(metodosDeCamara)=> this.metodosDeCamara = metodosDeCamara}
                />
                <TouchableOpacity
                    onPress={() => this.tomarFoto()}
                >
                    <Text style={styles.btn}>Tomar foto</Text>
                </TouchableOpacity>
            </>
            : this.state.permisos && this.state.mostrarCamara === false ?
                <>
                    <Image
                        source={{uri : this.state.urlTemp}}
                        style={styles.img}
                        resizeMode={'contain'}
                    />
                    <TouchableOpacity
                        onPress={()=> this.aceptarFoto()}
                    >
                        <Text style={styles.btn}>
                            Aceptar Foto
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=> this.rechazarFoto()}
                    >
                        <Text style={styles.btn}>
                            Rechazar Foto
                        </Text>
                    </TouchableOpacity>
                </>
            :
            <Text>No tienes permisos para usar la camara</Text>

        }
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20, 
    },
    camaraContainer: {
        flex:1,
        width: '80%', 
        aspectRatio: 1, 
        alignSelf: 'center', 
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 20,
        marginTop: 25, 
    },
    camara: {
        flex: 1,
        aspectRatio: 1, 
        backgroundColor: 'transparent',
    },
    img: {
        flex:1,
        width: '80%', 
        aspectRatio: 1,
        alignSelf: 'center',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 5,
        marginTop: 5,
    },
    btnContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around', 
        width: '100%', 
        paddingHorizontal: 20,
        marginTop: 10, 
    },
    btn: {
        backgroundColor: 'grey',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        minWidth: 120, 
    },
    textoBtn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
});
