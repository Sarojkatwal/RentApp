import React, { Component } from "react";
import { Image, View, Platform, Text, StyleSheet } from 'react-native';
import { List, Avatar, Appbar, Button } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export class ChangeUP extends Component {
    state = {
        image: null,
        next: 'ChangeUP'
    };

    render() {
        return (
            <>
                <View style={styles.container}>
                    <Appbar style={{ backgroundColor: 'green' }}>
                        <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                        <Appbar.Content title="Change Password" />
                        <Appbar.Action icon="dots-vertical" />
                    </Appbar>
                    <Text>Change password</Text>
                </View>
            </>
        );
    }
}

export default ChangeUP;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    a1: {
        marginTop: 30,
        marginHorizontal: 10,
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    a2: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: 'green',
        borderRadius: 20
    }
})
