import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, LogIn, SignUp, InsideApp } from "./HLS";

const Stack = createStackNavigator();

class LogInSignUp extends React.Component {
  render() {
    const { user } = this.props
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user == null ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="LogIn" component={LogIn} />
          </>
        ) : (
            <>
              <Stack.Screen name="InsideApp" component={InsideApp} />
            </>
          )}
      </Stack.Navigator>
    );
  }
}
export default LogInSignUp;

