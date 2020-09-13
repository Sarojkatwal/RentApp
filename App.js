import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LogInSignUp from './Root/AppCompo/LogInSignUp'
import { getLoggedUser } from './Root/Firebase/api'
import { YellowBox } from 'react-native';

class App extends React.Component {
  construct() {
    YellowBox.ignoreWarnings(['Setting a timer']);
  }
  state = {
    user: null,
  };
  componentDidMount = () => {
    getLoggedUser((user) => { this.setState({ user }) })
  }
  render() {
    return (
      <NavigationContainer>
        <LogInSignUp user={this.state.user} />
      </NavigationContainer>
    );
  }
}
export default App;

