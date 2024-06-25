import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import React, { Component } from 'react';
import { db } from '../firebase/config';
import Posteo from '../components/Posteo';

export default class Usuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            posteos: []
        };
    }

    componentDidMount() {
        db.collection('usuarios').where('owner', '==', this.props.route.params.user).onSnapshot((docs) => {
            let arrDocs = [];
            docs.forEach((doc) => {
                arrDocs.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            this.setState({
                usuarios: arrDocs
            });
        });

        db.collection('posteos').where('owner', '==', this.props.route.params.user).onSnapshot((docs) => {
            let arrDocs = [];
            docs.forEach((doc) => {
                arrDocs.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            arrDocs.sort((a, b) => b.data.createdAt - a.data.createdAt);
            this.setState({
                posteos: arrDocs
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileInfo}>
                    <FlatList 
                        data={this.state.usuarios}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.profileContainer}>
                                <Image
                                    source={{ uri: item.data.fotoPerfil }}
                                    style={styles.fotoPerfil}
                                    resizeMode="cover"
                                />
                                <Text style={styles.username}>{item.data.name}</Text>
                                <Text style={styles.email}>{item.data.owner}</Text>
                                {item.data.biografia ? (
                                    <Text style={styles.biografia}>{item.data.biografia}</Text>
                                ) : null}
                            </View>
                        )}
                    />
                </View>
                <View style={styles.posts}>
                    <Text style={styles.postsTitle}>Posteos de {this.props.route.params.user}</Text>
                    <Text style={styles.postCount}>Cantidad: {this.state.posteos.length}</Text>
                    <FlatList
                        data={this.state.posteos}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.post}>
                                <Posteo navigation={this.props.navigation} data={item.data} id={item.id} />
                            </View>
                        )}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        paddingTop: 20,
    },
    profileInfo: {
        
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    profileContainer: {
        alignItems: 'center',
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    fotoPerfil: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    biografia: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 10,
    },
    posts: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    postsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    postCount: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    post: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 15,
        padding: 15,
    },
});
