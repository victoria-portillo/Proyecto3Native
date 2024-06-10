import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'
import Posteo from '../components/posteo'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posteos: []
        }
    }

    componentDidMount() {
        db.collection('posteos')
            .orderBy('createdAt', 'desc')
            .onSnapshot(docs => {
                let arrayPosteos = []
                docs.forEach(doc => {
                    const dataDePosteos = doc.data();
                    const owner = dataDePosteos.owner;
                    arrayPosteos.push({
                        id: doc.id,
                        data: dataDePosteos,
                        owner: owner 
                    })
                })

                this.setState({
                    posteos: arrayPosteos
                })
            })
    }

    render() {
        return (
            <View style={styles.posteos}>
                <FlatList 
                    data={this.state.posteos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Posteo
                        navigation={this.props.navigation}
                        data={item.data}
                        id={item.id}
                        owner={item.owner} 
                    />
                    )}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    posteos: {
        flex: 1,
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    
    
})