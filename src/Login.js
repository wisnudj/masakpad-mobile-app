import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from 'react-native';
import {connect} from 'react-redux'
import {signin} from '../actions/userActions'

class Login extends Component {

  constructor() {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount = () => {
    AsyncStorage.getItem('name').then((value) => this.setState({ data: value }))    
  }

  static navigationOptions = {
    title: 'Masuk',
    fontSize: 10
  }

  masuk = () => {
    this.props.signin(this.state.email, this.state.password)
  }
  
  render() {
    return(
      <View style={styles.containerStyle}>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Email"
        placeholderTextColor="#cecaca"
        value = {this.state.email}
        onChangeText={text => this.setState({email: text})}
      />
      <TextInput
        style={styles.textInputStyle}        
        placeholder="Kata Kunci"
        placeholderTextColor="#cecaca"
        value = {this.state.password}
        onChangeText={text => this.setState({password: text})}
      />
      <TouchableOpacity 
        style={styles.buttonStyle}
        onPress = {() => this.masuk()}
      >
        <Text style={styles.textStyleButton}>Masuk</Text>
      </TouchableOpacity>  
      </View>
    )
  }
}

const styles = {
  imageStyle: {
    height: 130,
    width: 180,
    marginTop: 60
  },

  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10
  },

  textStyleButton: {
    textAlign: "center", 
    marginTop: "auto", 
    marginBottom: "auto",
    fontSize: 18
  },

  buttonStyle: {
    width: 340,
    height: 40,
    backgroundColor: '#cecaca',
    marginTop: 60

  },

  textInputStyle: {
    width: 340,
    height: 40
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    access_token: state.reducer.access_token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signin: (email, password) => dispatch(signin(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);