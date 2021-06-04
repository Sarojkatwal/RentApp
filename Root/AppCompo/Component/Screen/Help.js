import React, { Component } from "react";
import { View, Text, StatusBar, StyleSheet, Image, Button } from "react-native";
import { List, Caption, Appbar } from "react-native-paper";

export class Help extends Component {
    render() {
        return (
            <>
                <Appbar style={{ backgroundColor: 'green' }}>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title="Help" />

                </Appbar>
                <View>
                    <Text>Help</Text>
                </View>
            </>
        );
    }
}

export default Help;
