import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db, auth } from '../firebase/config';
import firebase from 'firebase/app';

export default class ContadorLikes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: props.likes.length,
            controlarLike: props.likes.includes(auth.currentUser ? auth.currentUser.email : ''),
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.likes !== this.props.likes) {
            this.setState({
                likes: this.props.likes.length,
                controlarLike: this.props.likes.includes(auth.currentUser ? auth.currentUser.email : ''),
            });
        }
    }

    like() {
        const user = auth.currentUser;
        if (!user || !user.email) {
            console.error('usuario no verificado');
            return;
        }

        db.collection('posteos')
            .doc(this.props.postId)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(user.email)
            })
            .then(() => {
                this.refreshLikes();
            })
            .catch((err) => console.error('error actualizacion likes:', err));
    }

    dislike() {
        const user = auth.currentUser;
        if (!user || !user.email) {
            console.error('usuario no verificado');
            return;
        }

        db.collection('posteos')
            .doc(this.props.postId)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(user.email)
            })
            .then(() => {
                this.refreshLikes();
            })
            .catch((err) => console.error('error actualizacion likes:', err));
    }

    refreshLikes() {
        db.collection('posteos')
            .doc(this.props.postId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const postData = doc.data();
                    this.setState({
                        likes: postData.likes.length,
                        controlarLike: postData.likes.includes(auth.currentUser.email),
                    });
                }
            })
            .catch((err) => console.error('error en el refresh:', err));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.likes} {this.state.likes === 1 ? 'Like' : 'Likes'}</Text>
                {this.state.controlarLike ? (
                    <TouchableOpacity onPress={() => this.dislike()}>
                        <FontAwesome name="heart" size={24} color="red" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => this.like()}>
                        <FontAwesome name="heart-o" size={24} color="black" />
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});