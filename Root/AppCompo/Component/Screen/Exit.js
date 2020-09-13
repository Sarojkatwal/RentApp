import React, { Component } from "react";
import { View, Text, StatusBar, StyleSheet, Image, Button } from "react-native";
import { List, Caption, Appbar } from "react-native-paper";
import { signout } from '../../../Firebase/api'

export class Exit extends Component {
    render() {
        return (
            <View>
                <Button onPress={signout} title="Sign Out Exit" />
            </View>
        );
    }
}

export default Exit;
