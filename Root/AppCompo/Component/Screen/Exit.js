import React, { Component } from "react";
import { View, Text, StatusBar, StyleSheet, Image } from "react-native";
import { Provider, Portal, Dialog, Button, Appbar, Paragraph } from "react-native-paper";
import { signout } from '../../../Firebase/api'

export class Exit extends Component {
    state = {
        visible: false
    }
    render() {
        return (
            <Provider>
                <Appbar style={{ backgroundColor: "green" }}>
                    <Appbar.BackAction color="black" onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title="Exit" color="black" />
                </Appbar>
                <View style={{ margin: 20 }}>
                    <Button onPress={() => {
                        this.setState({
                            visible: true
                        })
                    }} mode='contained'>Sign Out </Button>
                </View>
                <Portal>
                    <Dialog dismissable={false}
                        visible={this.state.visible}
                        onDismiss={() => this.setState({
                            ...this.state,
                            visible: false
                        })}>
                        <Dialog.Title style={{ fontSize: 30 }}>Alert!!!</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph style={{ fontSize: 20 }}>Do you really want to sign out?</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions style={{ justifyContent: "space-between", paddingHorizontal: 25 }}>
                            <Button onPress={() => this.setState({
                                ...this.state,
                                visible: false
                            }, signout)}
                            >Yes
                            </Button>
                            <Button onPress={() => this.setState({
                                ...this.state,
                                visible: false
                            })}>Back</Button>
                        </Dialog.Actions>

                    </Dialog>
                </Portal>
            </Provider>
        );
    }
}

export default Exit;
