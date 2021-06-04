import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator
} from "react-native";
import { Provider, Dialog, Portal } from 'react-native-paper'
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { save_likeNotifications, getLikeNotifications } from '../../Firebase/notify'
import { signIn } from '../../Firebase/api'
import { startSearch } from '../../Firebase/match'
import { sum_priority } from '../../Firebase/priority'
import { registerForPushNotifications, sendPushNotification } from '../../Firebase/pushnotification'
class LogIn extends React.Component {
  state = {
    username: "",
    password: "",
    visible: false,
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: false,
    isValidPassword: false,
    isValidUserf: true,
    isValidPasswordf: true,
  };

  textInputChange = (val) => {
    if (val.length !== 0) {
      this.setState({
        ...this.state,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
        isValidUserf: true,
        isValidPasswordf: true,
      });
    } else {
      this.setState({
        ...this.state,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
        isValidUserf: true,
        isValidPasswordf: true,
      });
    }
  };

  handlePasswordChange = (val) => {
    if (val.length !== 0) {
      this.setState({
        ...this.state,
        password: val,
        check_textInputChange: true,
        isValidPassword: true,
        isValidUserf: true,
        isValidPasswordf: true,
      });
    } else {
      this.setState({
        ...this.state,
        password: val,
        check_textInputChange: false,
        isValidPassword: false,
        isValidUserf: true,
        isValidPasswordf: true,
      });
    }
  };

  handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      this.setState({
        ...this.state,
        isValidUser: true,
      });
    } else {
      this.setState({
        ...this.state,
        isValidUser: false,
      });
    }
  };

  updateSecureTextEntry = () => {
    this.setState({
      ...this.state,
      secureTextEntry: !this.state.secureTextEntry,
    });
  };

  loginHandle = () => {
    this.setState({
      ...this.state,
      isValidUserf: this.state.isValidUser,
      isValidPasswordf: this.state.isValidPassword,
    })
    if (this.state.isValidPassword && this.state.isValidUser) {
      this.setState({
        ...this.state,
        visible: true
      })
      signIn(this.state.username, this.state.password)
        .then((res) => {
          if (res == undefined) {
            this.setState({
              ...this.state,
              visible: false
            })
            Alert.alert('No such username and password found')
            return;
          }

          var tmode = true;

          startSearch(res.user.uid, tmode).then(() => {
            // use global.Roomt and global.Roomo here 
          }).catch((err) => { console.log(err) });


          registerForPushNotifications().then((token) => {
            console.log('token added ' + token)
          }).catch((err) => {
            console.log(err)
          })

        })

    }
  };
  forgotPass = () => {

  }

  render() {
    const colors = {
      background: "white",
      text: "green",
    };
    return (
      <Provider>
        <View style={styles.container}>
          <StatusBar backgroundColor="#009387" barStyle="light-content" />
          <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
          </View>
          <Animatable.View
            animation="fadeInUpBig"
            style={[
              styles.footer,
              {
                backgroundColor: colors.background,
              },
            ]}
          >
            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                },
              ]}
            >
              Username
          </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color={colors.text} size={20} />
              <TextInput
                placeholder="Your Username"
                placeholderTextColor="#666666"
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(val) => this.textInputChange(val)}
              //onEndEditing={(e) => this.handleValidUser(e.nativeEvent.text)}
              />
              {this.state.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>
            {this.state.isValidUserf ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Username must not be empty.
              </Text>
              </Animatable.View>
            )}

            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  marginTop: 35,
                },
              ]}
            >
              Password
          </Text>
            <View style={styles.action}>
              <Feather name="lock" color={colors.text} size={20} />
              <TextInput
                placeholder="Your Password"
                placeholderTextColor="#666666"
                secureTextEntry={this.state.secureTextEntry ? true : false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                onChangeText={(val) => this.handlePasswordChange(val)}
              />
              <TouchableOpacity onPress={this.updateSecureTextEntry}>
                {this.state.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                    <Feather name="eye" color="green" size={20} />
                  )}
              </TouchableOpacity>
            </View>
            {this.state.isValidPasswordf ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Password must not be empty.
              </Text>
              </Animatable.View>
            )}
            <TouchableOpacity onPress={this.forgotPass}>
              <Text style={{ color: "#009387", marginTop: 15 }}>
                Forgot password?
            </Text>
            </TouchableOpacity>
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.LogIn}
                onPress={this.loginHandle}
              >
                <LinearGradient
                  colors={["#08d4c4", "#01ab9d"]}
                  style={styles.LogIn}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#fff",
                      },
                    ]}
                  >
                    Log In
                </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("SignUp")}
                style={[
                  styles.LogIn,
                  {
                    borderColor: "#009387",
                    borderWidth: 1,
                    marginTop: 15,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#009387",
                    },
                  ]}
                >
                  Sign Up
              </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
          <Portal>
            <Dialog visible={this.state.visible} dismissable={false}
              onDismiss={() => this.setState({
                ...this.state,
                visible: false
              })}
              style={{
                backgroundColor: 'skyblue',
                borderRadius: 30,
              }}
            >
              <Dialog.Title>Loading</Dialog.Title>
              <Dialog.Content>
                <ActivityIndicator size='large' />
              </Dialog.Content>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    );
  }
}
export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  LogIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
