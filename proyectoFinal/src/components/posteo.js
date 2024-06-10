import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export default class Posteo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            controlarLike: false,
        };
    }

    componentDidMount() {
        const validacionLike = this.props.data.likes.includes(auth.currentUser.correo);
        this.setState({
            controlarLike: validacionLike
        });
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

    like() {
        db.collection('posteos')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.correo)
            })
            .then((resp) => {
                this.setState({
                    controlarLike: true
                });
            })
            .catch((err) => console.log(err));
    }

    dislike() {
        db.collection('posteos')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.correo)
            })
            .then((resp) => {
                this.setState({
                    controlarLike: false
                });
            })
            .catch((err) => console.log(err));
    }

    irComentarios() {
        this.props.navigation.navigate('Comentarios', { id: this.props.id });
    }

    irAlPerfil() {
        this.props.data.owner == auth.currentUser.correo
          ? this.props.navigation.navigate('miPerfil')
          : this.props.navigation.navigate('perfilUsuario', { user: this.props.data.owner });
      }

    render() {
        const { data } = this.props;

        return (
            <View style={styles.posts}>
                <TouchableOpacity onPress={() => this.irAlPerfil()}>
                <Text style={styles.ownerName}>{this.props.data.owner}</Text>
                </TouchableOpacity>
                <View>
                    <Image
                        source={{ uri: data.fotoUrl ? data.fotoUrl : '' }}
                        style={styles.img}
                        resizeMode='contain'
                    />
                    <Text style={styles.description}>{data.descripcion}</Text>
                    <Text>
                        {data.likes.length}
                    </Text>
                    {
                        this.state.controlarLike ?
                            <TouchableOpacity onPress={() => this.dislike()}>
                                <FontAwesome name='heart' color='red' size={24} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => this.like()}>
                                <FontAwesome name='heart-o' color='red' size={24} />
                            </TouchableOpacity>
                    }
                </View>
                <View>
                <View>
                    <TouchableOpacity onPress={() => this.irComentarios()}>
                    <Text style={styles.commentText}> {data.comentarios ? data.comentarios.length : 0} Comentarios </Text>
                    </TouchableOpacity>
</View>
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