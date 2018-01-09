import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import Resep from './Resep'
import ResepDetail from './ResepDetail'
import NewResep from './NewResep'
import NewRecook from './NewRecook'

class Main extends Component {

  render() {
    const ResepNavigation = StackNavigator({
      Resep: {
        screen: Resep,
        navigationOptions: ({navigation}) => ({
          title: `Home`,
        })
      },
      ResepDetail: {screen: ResepDetail},
      NewResep: {screen: NewResep},
      NewRecook: {screen: NewRecook}
    }, {
      headerMode: 'none',
    })
    return (
      <ResepNavigation />
    );
  }
}

export default Main