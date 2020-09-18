import React, { Component } from "react";
import { View, Text, StyleSheet, Images } from "react-native";
import { Button, TextInput, Dialog, Portal, RadioButton, Title, Provider, ScrollView } from 'react-native-paper'
import Feather from "react-native-vector-icons/Feather";
class Add extends Component {
    state = {
        visiblefortype: false, //whether room type dialog is visible
        visible: false,//visible for maxprice dialog
        photos: [],//whether visible for negotation on price
        visiblefordesc: false, //whether visible for description
        value: 0,
        valuefortype: 0,
        valuefordesc: ""
    }
    showDialogfortype = () => this.setState({
        visiblefortype: true,
    })

    hideDialogfortype = () => this.setState({
        visiblefortype: false,

    })
    showDialog = () => this.setState({
        visible: true,
    })

    hideDialog = () => this.setState({
        visible: false,

    })
    showDialogfordesc = () => this.setState({
        visiblefordesc: true,
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
                    <Button mode='contained' icon={this.state.valuefortype == 0 ? 'home' : 'check-circle'}
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
                    <Button mode='contained' icon={this.state.value == 0 ? 'cash-usd' : 'check-circle'} onPress={this.showDialog}
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
                                    keyboardType='number-pad'
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
                    <Button mode='contained' icon={(this.state.photos.length == 0) ? 'image-plus' : 'check-circle'}
                        onPress={() => this.props.navigation.push('SelImages')}
                        style={{

                            borderRadius: 30,
                            width: "45%",
                            marginBottom: 20
                        }}
                    >RoomImages</Button>

                    <Button mode='contained' icon={!(this.state.valuefordesc.trim().length) ? 'account-details' : 'check-circle'} onPress={this.showDialogfordesc}
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
                        onPress={() => alert(this.state.value + ' ' + this.state.valuefordesc.trim().length)}
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