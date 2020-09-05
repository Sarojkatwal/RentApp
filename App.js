import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
//import CheckLoggedIn from './Root/CheckLoggedIn'
import LogInSignUp from './Root/AppCompo/LogInSignUp'
//import Mapview from './CCCMp/mapView'
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
