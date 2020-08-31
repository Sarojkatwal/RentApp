import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import firebase from "./Firebase";
import LogInSignUp from "./AppCompo/LogInSignUp";

class CheckLoggedIn extends React.Component {
  state = {
    loading: false,
    loggedin: false,
    user: {},
  };
  /*componentDidMount = () => {
    this.checkedIfLoggedIn();
  };
  checkedIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //this.props.navigation.navigate('Dashboard', { user })
        this.setState({ ...this.state, loggedin: true, user: user });
      } else {
        this.setState({ ...this.state, user: {} });
      }
      this.setState({ ...this.state, loading: false });
    });
  };*/
  render() {
    return this.state.loading ? (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    ) : !this.state.loggedin ? (
      <LogInSignUp />
    ) : (
          //<Dashboard user={this.state.user} />
          <View>
            <Text>Saroj done</Text>
          </View>
        );
  }
}
export default CheckLoggedIn;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
