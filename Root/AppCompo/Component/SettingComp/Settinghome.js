import React, { Component } from "react";
import { Image, View, Platform, Text, StyleSheet } from 'react-native';
import { List, Badge, Appbar, Button } from "react-native-paper";

export class Settinghome extends Component {
    render() {
        return (
            <>
                <View>
                    <Appbar style={{ backgroundColor: 'green' }}>
                        <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                        <Appbar.Content title="Setting" />
                        <Appbar.Action icon="dots-vertical" />
                    </Appbar>
                    <Button onPress={() => this.props.navigation.navigate('Changedp')}>Change DP</Button>
                    <Button onPress={() => this.props.navigation.navigate('Changeup')}>Change password</Button>
                </View>
            </>
        );
    }
}

export default Settinghome;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        backgroundColor: 'green',
        borderRadius: 20
    }
})
{/*
        </ >
 */}