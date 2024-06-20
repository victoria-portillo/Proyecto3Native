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
        marginVertical: 20,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#f5f5f5',
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    button: {
        backgroundColor: '#5F866F',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});