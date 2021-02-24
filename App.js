import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LogInSignUp from './Root/AppCompo/LogInSignUp'
import { getLoggedUser } from './Root/Firebase/api'
import './Root/Firebase/err'
//import Filldetails from './Root/AppCompo/Component/FillDetails'
class App extends React.Component {
  state = {
    user: null,
  };
  componentDidMount = () => {
    getLoggedUser((user) => { this.setState({ user }) })
  }

  render() {
    return (
      <>
        <NavigationContainer>
          <LogInSignUp user={this.state.user} />
        </NavigationContainer>

      </>
    );
  }
}
export default App;

