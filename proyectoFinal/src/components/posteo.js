import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { db, auth } from '../firebase/config.js';
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
        const comentarios = data.comentarios || []; 


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

                    <FlatList
                        data={comentarios.slice(-4)} 
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.commentContainer}>
                                <Text style={styles.comment}>{item.comentario}</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 60, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    ownerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    img: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    commentText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    comment: {
        color: '#555',
        fontSize: 14,
        marginBottom: 5,
    },
});