import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import FormComentarios from '../components/FormularioComentarios';
import { db } from '../firebase/config';

export default class Comentarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPosteo: null,
        };
    }

    componentDidMount() {
        this.unsubscribe = db
            .collection('posteos')
            .doc(this.props.route.params.id)
            .onSnapshot((doc) => {
                this.setState({ dataPosteo: doc.data() });
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Comentarios</Text>
                {this.state.dataPosteo !== null && this.state.dataPosteo.comentarios !== undefined ? (
                    <View style={styles.commentsContainer}>
                        <FlatList
                            data={this.state.dataPosteo.comentarios
                                .slice()
                                .sort((a, b) => b.createdAt - a.createdAt)}
                            keyExtractor={(item) => item.createdAt.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.commentContainer}>
                                    <Text style={styles.ownerText}>{item.owner}</Text>
                                    <Text style={styles.commentText}>{item.comentario}</Text>
                                </View>
                            )}
                        />
                    </View>
                ) : (
                    <Text>Aún no hay comentarios.</Text>
                )}
                <FormComentarios posteoId={this.props.route.params.id} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    commentsContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 20,
    },
    commentContainer: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 10,
    },
    ownerText: {
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    commentText: {
        color: '#555',
    },
    noCommentsText: {
        color: '#555',
        textAlign: 'center',
        marginVertical: 20,
    },
});

