import {View, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import FormularioLogin from '../components/FormularioLogin'
import { auth } from '../firebase/config'


export default class Login extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    auth.onAuthStateChanged(( user )=> {
      if(user !== null){
        this.props.navigation.navigate('TabNavigation')
      }
    })
  }
 

  render() {
    return (
      <View style={styles.container}>
        <FormularioLogin navigation={this.props.navigation} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: 'white',
      textAlign: 'center',
  },
});

