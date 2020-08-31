import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import * as Google from "expo-google-app-auth";
//import firebase from "../Firebase";
import { Home, LogIn, SignUp, InsideApp } from "./HLS";

const Stack = createStackNavigator();

class LogInSignUp extends React.Component {
  state = {
    signedin: false,
  };
  /*isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          console.log("true");
          return true;
        }
      }
    }
    console.log("false");
    return false;
  };
  onSignIn = (googleUser) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((result) => {
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref("/users/" + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  locale: result.additionalUserInfo.profile.locale,
                  created_at: Date.now(),
                })
                .catch((error) => console.log(error));
            } else {
              firebase
                .database()
                .ref("/users/" + result.user.uid)
                .update({
                  last_loggedin_at: Date.now(),
                });
            }
            Alert.alert("User Signed In");
          })
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log(error);
          });
      } else {
        console.log("User already signed-in Firebase.");
      }
    });
  };
  signIn = async () => {
    this.setState({
      signedin: true,
    });
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "93379620060-2vh9ldbbdju8smfpdgk4qh6mk5dug3dj.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        this.setState({
          signedin: false,
        });
        return { cancelled: true };
      }
    } catch (e) {
      this.setState({
        signedin: false,
      });
      return { error: true };
    }
  };*/
  render() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="InsideApp" component={InsideApp} />

          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
export default LogInSignUp;

