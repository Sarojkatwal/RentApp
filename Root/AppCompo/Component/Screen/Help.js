import React, { Component } from "react";
import { View, Text, StatusBar, StyleSheet, Image, Button } from "react-native";
import { List, Caption, Appbar } from "react-native-paper";

export class Help extends Component {
    render() {
        return (
            <>
                <Appbar>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title="Title" subtitle="Subtitle" />
                    <Appbar.Action icon="magnify" />
                    <Appbar.Action icon="dots-vertical" />
                </Appbar>
                <View>
                    <Button title="Sign Out" />
                </View>
            </>
        );
    }
}

export default Help;
