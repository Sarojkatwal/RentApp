import React from 'react';
import * as err from './Root/err'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import LogInSignUp from './Root/AppCompo/LogInSignUp'
export default class App extends React.Component {
  render() {
    return (
      <>
        <LogInSignUp />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
