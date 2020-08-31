import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import CheckLoggedIn from './Root/CheckLoggedIn'
import LogInSignUp from './Root/AppCompo/LogInSignUp'
export default class App extends React.Component {
  render() {
    return (
      <>
        <LogInsignUp />
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
