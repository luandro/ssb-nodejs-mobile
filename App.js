/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import nodejs from 'nodejs-mobile-react-native';

const uri = 'http://localhost:3000'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    msg: null
  }
  componentWillMount() {
    nodejs.start('index.js');
  }
  get = (i) => {
    fetch(`${uri}/${i}`)
      .then(res => res.json())
      .then(data => this.setState({ msg: data }))
      .catch(err => alert(err))
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Scuttlebot on NodeJS Mobile!
        </Text>
        <Button title="Keys"
          onPress={() => this.get('keys')}
        />
        <Button title="Path"
          onPress={() => this.get('path')}
        />
        <Text>{JSON.stringify(this.state.msg)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
