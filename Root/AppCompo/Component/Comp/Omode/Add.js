import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput, Dialog, Portal, RadioButton, Title, Provider } from 'react-native-paper'
class Add extends Component {
    state = {
        visiblefortype: false, //whether room type dialog is visible
        visible: false,//visible for maxprice dialog
        visibleforneg: false,//whether visible for negotation on price
        visiblefordesc: false, //whether visible for description
        value: 0,
        valuefortype: 0,
        valueforneg: 0,
        valuefordesc: 0
    }
    showDialogfortype = () => this.setState({
        visiblefortype: true,
        valuefortype: 0
    })

    hideDialogfortype = () => this.setState({
        visiblefortype: false,

    })
    showDialog = () => this.setState({
        visible: true,
        value: 0
    })

    hideDialog = () => this.setState({
        visible: false,

    })
    showDialogforneg = () => this.setState({
        visibleforneg: true,
        valueforneg: 0
    })

    hideDialogforneg = () => this.setState({
        visibleforneg: false,

    })
    showDialogfordesc = () => this.setState({
        visiblefordesc: true,
        valuefordesc: 0
    })

    hideDialogfordesc = () => this.setState({
        visiblefordesc: false,

    })
    render() {
        return (
            <Provider>
                <View style={styles.container}>
                    <Title style={{
                        fontSize: 30,
                        marginBottom: 60
                    }}>Owner Mode</Title>
                    <Button mode='contained' icon='map-marker-outline'
                        style={{
                            borderRadius: 30,

                            width: "45%",
                            marginBottom: 20
                        }}
                    >Select Area</Button>
                    <Button mode='contained' icon='home'
                        style={{
                            borderRadius: 30,
                            width: "45%",
                            marginBottom: 20
                        }}
                        onPress={this.showDialogfortype}>Room Type</Button>
                    <Portal>
                        <Dialog visible={this.state.visiblefortype} dismissable={false}
                            onDismiss={this.hideDialogfortype}
                            style={{
                                backgroundColor: 'skyblue',
                                borderRadius: 30,
                            }}
                        >
                            <Dialog.Title>Select Room Type</Dialog.Title>
                            <Dialog.Content>
                                <RadioButton.Group
                                    onValueChange={(x) => this.setState({ valuefortype: x })}
                                    value={this.state.valuefortype}
                                >
                                    <RadioButton.Item label="Single Room" value={1} color='red' />
                                    <RadioButton.Item label="Double Room" value={2} color='red' />
                                    <RadioButton.Item label="Flat" value={3} color='red' />

                                </RadioButton.Group>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={this.hideDialogfortype}>Done</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                    <Button mode='contained' icon='cash-usd' onPress={this.showDialog}
                        style={{

                            borderRadius: 30,
                            width: "45%",
                            marginBottom: 20
                        }}
                    >Max Price</Button>
                    <Portal>
                        <Dialog visible={this.state.visible} dismissable={false}
                            onDismiss={this.hideDialog}
                            style={{
                                backgroundColor: 'skyblue',
                                borderRadius: 30,


                            }}
                        >
                            <Dialog.Title>Enter Maximum price</Dialog.Title>
                            <Dialog.Content>
                                <TextInput
                                    mode='outlined'
                                    placeholder="5000"
                                    value={this.state.value}
                                    onChangeText={value => this.setState({ value })}
                                    style={{
                                        borderRadius: 60
                                    }}
                                />
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={this.hideDialog}>Done</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                    <Button mode='contained' icon='account-question' onPress={this.showDialogforneg}
                        style={{

                            borderRadius: 30,
                            width: "45%",
                            marginBottom: 20
                        }}
                    >Negotiable</Button>
                    <Portal>
                        <Dialog visible={this.state.visibleforneg} dismissable={false}
                            onDismiss={this.hideDialogforneg}
                            style={{
                                backgroundColor: 'skyblue',
                                borderRadius: 30,
                            }}
                        >
                            <Dialog.Title>Is Price Negotiable?/</Dialog.Title>
                            <Dialog.Content>
                                <RadioButton.Group
                                    onValueChange={(x) => this.setState({ valueforneg: x })}
                                    value={this.state.valueforneg}
                                >
                                    <RadioButton.Item label="Yes" value={1} color='red' />
                                    <RadioButton.Item label="No" value={2} color='red' />

                                </RadioButton.Group>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={this.hideDialogforneg}>Done</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                    <Button mode='contained' icon='account-details' onPress={this.showDialogfordesc}
                        style={{

                            borderRadius: 30,
                            width: "45%",
                            marginBottom: 20
                        }}
                    >Description</Button>
                    <Portal>
                        <Dialog visible={this.state.visiblefordesc} dismissable={false}
                            onDismiss={this.hideDialogfordesc}
                            style={{
                                backgroundColor: 'skyblue',
                                borderRadius: 30,


                            }}
                        >
                            <Dialog.Title>Description</Dialog.Title>
                            <Dialog.Content>
                                <TextInput
                                    mode='outlined'
                                    multiline={true}
                                    numberOfLines={5}
                                    placeholder="Write about room and owner(owner job)"
                                    value={this.state.valuefordesc}
                                    onChangeText={valuefordesc => this.setState({ valuefordesc })}
                                    style={{
                                        borderRadius: 60
                                    }}
                                />
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={this.hideDialogfordesc}>Done</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                    <Button mode='contained' icon='plus'
                        style={{
                            backgroundColor: 'green',
                            borderRadius: 30,
                            width: "45%",
                            marginBottom: 20
                        }}
                        onPress={() => alert(this.state.value + ' ' + this.state.valuefortype)}
                    >Add Room</Button>
                </View>

            </Provider>

        );
    }
}

export default Add;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'skyblue',
        margin: 30,
        borderRadius: 60
    },
});