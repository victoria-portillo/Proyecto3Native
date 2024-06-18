import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import ContadorLikes from './ContadorLikes.js'; 

export default class Posteo extends Component {
    constructor(props) {
        super(props);
    }

    borrarPosteo() {
        db.collection('posteos')
            .doc(this.props.id)
            .delete()
            .then(() => {
                console.log('Posteo eliminado correctamente');
            })
            .catch((error) => {
                console.error('Error al eliminar el posteo:', error);
            });
    }

    irComentarios() {
        this.props.navigation.navigate('Comentarios', { id: this.props.id });
    }

    irAlPerfil() {
        this.props.data.owner === auth.currentUser.correo
          ? this.props.navigation.navigate('miPerfil')
          : this.props.navigation.navigate('Usuario', { user: this.props.data.owner });
    }

    render() {
        const { data } = this.props;

        return (
            <View style={styles.posts}>
                <TouchableOpacity onPress={() => this.irAlPerfil()}>
                    <Text style={styles.ownerName}>{data.owner}</Text>
                </TouchableOpacity>
                <View>
                    <Image
                        source={{ uri: data.fotoUrl ? data.fotoUrl : '' }}
                        style={styles.img}
                        resizeMode='contain'
                    />
                    <Text style={styles.description}>{data.descripcion}</Text>
                    <ContadorLikes postId={this.props.id} likes={this.props.data.likes} />
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.irComentarios()}>
                        <Text style={styles.commentText}>{data.comentarios ? data.comentarios.length : 0} Comentarios</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    posts: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    ownerName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '555',
        marginBottom: 10,
    },
    commentText: {
        color: '#5F866F',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 15,
    },
});