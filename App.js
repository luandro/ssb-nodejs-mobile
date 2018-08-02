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

type Props = {};
export default class App extends Component<Props> {
  state = {
    whoami: null,
    path: null,
  }
  componentWillMount() {
    nodejs.start('index.js');
  }
  get = (i) => {
    fetch(`${uri}/${i}`)
      .then(res => res.json())
      .then(data => this.setState({ [i]: data }))
      .catch(err => alert(err))
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Scuttlebot on NodeJS Mobile!
        </Text>
        <Button title="Who am I"
          onPress={() => this.get('whoami')}
        />
        <Text>{JSON.stringify(this.state.whoami)}</Text>
        <Button title="Path"
          onPress={() => this.get('path')}
        />
        <Text>{JSON.stringify(this.state.path)}</Text>
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
});
