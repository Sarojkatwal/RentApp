import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator
} from "react-native";
import { Provider, Dialog, Portal } from 'react-native-paper'
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { signUp } from '../../Firebase/api'
import { registerForPushNotifications, sendPushNotification } from '../../Firebase/pushnotification'
class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidUser: false,
    isValidPassword: false,
    isValidUserf: true,
    isValidPasswordf: true,
    visible: false
  };

  inputRef1 = React.createRef()
  inputRef2 = React.createRef()

  alertShow = (str) => {
    return (
      Alert.alert(
        str,
        '',
        [
          {
            text: 'Ok',
            onPress: () => {
              this.setState({
                ...this.state,
                visible: false
              })
            },
            style: 'cancel'
          },
        ],
        { cancelable: false }
      )
    )
  }

  textInputChange = (val) => {
    if (val.trim().length >= 4) {
      this.setState({
        ...this.state,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
        isValidUserf: true,
      });
    } else {
      this.setState({
        ...this.state,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
        isValidUserf: false,
      });
    }
  };
  handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      this.setState({
        ...this.state,
        password: val,
        isValidPassword: true,
        isValidPasswordf: true
      });
    } else {
      this.setState({
        ...this.state,
        password: val,
        isValidPassword: false,
        isValidPasswordf: false
      });
    }
  };
  handleConfirmPasswordChange = (val) => {
    this.setState({
      ...this.state,
      confirm_password: val,
    });
  };

  updateSecureTextEntry = () => {
    this.setState({
      ...this.state,
      secureTextEntry: !this.state.secureTextEntry,
    });
  };

  updateConfirmSecureTextEntry = () => {
    this.setState({
      ...this.state,
      confirm_secureTextEntry: !this.state.confirm_secureTextEntry,
    });
  };
  signUpHandle = () => {
    if (this.state.isValidUser && this.state.isValidPassword) {
      if (this.state.password === this.state.confirm_password) {
        this.setState({
          ...this.state,
          visible: true
        })
        signUp(this.state.username, this.state.password, this.alertShow)
          .then((res) => {
            registerForPushNotifications().then((token) => {
              console.log('token added ' + token)
            }).catch((err) => {
              console.log(err)
            })
            if (res) {
              if (typeof (res) == 'string') {
                //console.log('resup:', res)
                this.setState({
                  ...this.state,
                  visible: false
                })
                Alert.alert(res)
              }
            }
          })
      }
      else {
        Alert.alert('Password didnot match')
      }
    }
    else {
      Alert.alert(
        'Enter all the fields correctly!!!',
        '',
        [

          {
            text: 'Ok',
            onPress: () => {
              if (!this.state.isValidUser) {
                this.inputRef1.current.focus()
              }
              else if (!this.state.isValidPassword) {
                this.inputRef2.current.focus()
              }
            },
            style: 'cancel'
          },
        ],
        { cancelable: false }
      );
    }
  }
  render() {
    return (
      <Provider>
        <View style={styles.container}>
          <StatusBar backgroundColor="#009387" barStyle="light-content" />
          <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
          </View>
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <ScrollView>
              <Text style={styles.text_footer}>Username</Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Username"
                  style={styles.textInput}
                  autoCapitalize="none"
                  ref={this.inputRef1}
                  onChangeText={(val) => this.textInputChange(val)}
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
                    Username must be of at least 4 characters.
              </Text>
                </Animatable.View>
              )}

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 35,
                  },
                ]}
              >
                Password
            </Text>
              <View style={styles.action}>
                <Feather name="lock" color="#05375a" size={20} />
                <TextInput
                  placeholder="Your Password"
                  secureTextEntry={this.state.secureTextEntry ? true : false}
                  style={styles.textInput}
                  ref={this.inputRef2}
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
                    Password must be be of at least 8 characters.
              </Text>
                </Animatable.View>
              )}
              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 35,
                  },
                ]}
              >
                Confirm Password
            </Text>
              <View style={styles.action}>
                <Feather name="lock" color="#05375a" size={20} />
                <TextInput
                  placeholder="Confirm Your Password"
                  secureTextEntry={
                    this.state.confirm_secureTextEntry ? true : false
                  }
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => this.handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity onPress={this.updateConfirmSecureTextEntry}>
                  {this.state.confirm_secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                      <Feather name="eye" color="green" size={20} />
                    )}
                </TouchableOpacity>
              </View>

              <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                  By signing up you agree to our
              </Text>
                <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
                  {" "}
                Terms of service
              </Text>
                <Text style={styles.color_textPrivate}> and</Text>
                <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
                  {" "}
                Privacy policy
              </Text>
              </View>
              <View style={styles.button}>
                <TouchableOpacity style={styles.signIn} onPress={this.signUpHandle}>
                  <LinearGradient
                    colors={["#08d4c4", "#01ab9d"]}
                    style={styles.signIn}
                  >
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: "#fff",
                        },
                      ]}
                    >
                      Sign Up
                  </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                  style={[
                    styles.signIn,
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
                    Log In
                </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
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
        </View >
      </Provider>
    );
  }
}
export default SignUp;

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
    flex: Platform.OS === "ios" ? 3 : 5,
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
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 30,
  },
  signIn: {
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
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
});
