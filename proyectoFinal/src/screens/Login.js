import {View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import FormularioLogin from '../components/FormularioLogin'


export default class Login extends Component {
  constructor(props){
    super(props)
  }

 

  render() {
    return (
      <View >
        <FormularioLogin navigation={this.props.navigation} />
      </View>
    )
  }
}


