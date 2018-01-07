/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import Opening from './src/Opening'
import Login from './src/Login'
import Daftar from './src/Daftar'
import Main from './src/Main'
import {connect} from 'react-redux'
import {signin} from './actions/userActions'

class App extends Component<{}> {

  render() {
    const OpeningNavigation = StackNavigator({
      Opening: {screen: Opening},
      Login: {screen: Login},
      Daftar: {screen: Daftar}
    },
    {
        navigationOptions: {
          headerStyle: { backgroundColor: 'white', height: 30 },
          headerTitleStyle: {fontSize: 16, fontWeight: '100' }
        }
      }
    )

    const MainNavigation = TabNavigator({
      Main: {screen: Main}
    })
    
    if (this.props.openingVisible) {
      komponen = [<OpeningNavigation key={Math.random()} />];
    } else {
      komponen = [<MainNavigation key={Math.random()} />]
    }
    return (
      komponen
    );
  }
}

const mapStateToProps = (state) => {
  return {
    access_token: state.reducer.access_token,
    openingVisible: state.reducer.openingVisible,
    mainVisible: state.reducer.mainVisible
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signin: (email, password) => dispatch(signin(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

