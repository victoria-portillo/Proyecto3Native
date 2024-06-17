import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export default class FormularioComentarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentario: '',
        };
    }

   comentar() {
        if (this.state.comentario.trim() === '') {
            return; 
        }

        db.collection('posteos')
            .doc(this.props.posteoId)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    comentario: this.state.comentario,
                }),
            });

        this.setState({ comentario: '' });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.commentInputContainer}>
                    <TextInput
                        placeholder='Agrega tu comentario'
                        keyboardType='default'
                        onChangeText={(text) => this.setState({ comentario: text })}
                        value={this.state.comentario}
                        multiline={true}
                        numberOfLines={4}
                        style={styles.commentInput}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => this.comentar()}
                    disabled={!this.state.comentario.trim()} 
                    style={styles.button}
                >
                    <Text>Comentar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '70%',
        alignSelf: 'center',
    },
    commentInputContainer: {
        borderWidth: 2,
        borderColor: '#5F866F', 
        borderRadius: 5,
        marginBottom: 10,
    },
    commentInput: {
        padding: 10,
    },
    button: {
        backgroundColor: '#5F866F',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
});