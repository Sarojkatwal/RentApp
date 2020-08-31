import React, { Component } from "react";
import { View, Text, StatusBar, StyleSheet, Image, Button } from "react-native";
import { List, Caption, Appbar } from "react-native-paper";

export class Feedback extends Component {
    render() {
        return (
            <>
                <View>
                    <Appbar>
                        <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                        <Appbar.Content title="Title" subtitle="Subtitle" />
                        <Appbar.Action icon="magnify" />
                        <Appbar.Action icon="dots-vertical" />
                    </Appbar>
                    <Button title="Sign Out" />
                </View>
            </>
        );
    }
}

export default Feedback;
