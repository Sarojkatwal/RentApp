import React, { Component } from "react";
import { Image, View, Text, StyleSheet, Alert } from 'react-native';
import { Title, Avatar, Appbar, Button, TextInput } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import firebase from '../../../Firebase/Firebase'
export class ChangeUP extends Component {
    state = {
        pass: '',
        passn: ''
    };
    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    changePassword = () => {
        var currentPassword = this.state.pass
        var newPassword = this.state.passn
        if (currentPassword.length !== 0 && newPassword.length !== 0) {
            this.reauthenticate(currentPassword).then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(newPassword)
                    .then(() => {
                        alert("Password updated!");
                    })
                    .catch((error) => { alert(error); });
            })
                .catch((error) => { alert(error); })
                .then(() => {
                    this.setState({
                        pass: '',
                        passn: ''
                    })
                });
        }
        else {
            alert("Insert data correctly")
        }
    }

    render() {
        return (
            <>
                <Appbar style={{ backgroundColor: 'green' }}>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title="Change Password" />
                    <Appbar.Action icon="dots-vertical" />
                </Appbar>
                <View style={styles.container}>

                    <View >

                        <Title>Old Password:</Title>
                    </View>
                    <View >
                        <TextInput
                            style={styles.textInput}
                            mode="outlined"

                            //label={this.state.price}
                            onChangeText={(pass) => this.setState({ pass })}
                            value={`${this.state.pass}`}
                            maxLength={20}  //setting limit of input
                        />
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Title>New Password:</Title>
                    </View>
                    <View >
                        <TextInput
                            style={styles.textInput}
                            mode="outlined"
                            //label={this.state.price}
                            onChangeText={(passn) => this.setState({ passn })}
                            value={`${this.state.passn}`}
                            maxLength={20}  //setting limit of input
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Button mode='contained' color="pink" onPress={this.changePassword}> Ok</Button>
                    </View>
                </View>
            </>
        );
    }
}

export default ChangeUP;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //padding: 20,
        margin: 20
    },
    button: {
        backgroundColor: 'green',
        borderRadius: 20
    },
    a1: {

        flexDirection: "column",
        justifyContent: "flex-start",
    },
    a2: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
})
