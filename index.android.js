/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './App/app'
import Tree from './App/tree'

export default class contacts extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Tree/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1,},
});

AppRegistry.registerComponent('contacts', () => contacts);
