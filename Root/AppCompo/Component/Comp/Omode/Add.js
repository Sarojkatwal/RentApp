import React, { PureComponent } from "react";
import { View, Text, StyleSheet, Images } from "react-native";
import { Button, TextInput, Dialog, Portal, RadioButton, Title, Provider, ScrollView } from 'react-native-paper'
import Feather from "react-native-vector-icons/Feather";
import faker from 'faker';
import { saveOwnerRoom } from '../../../../Firebase/api'
import firebase from '../../../../Firebase/Firebase'
import { uploadRoom } from '../../../../Firebase/storage'
class Add extends PureComponent {
    state = {
        visiblefortype: false, //whether room type dialog is visible
        visible: false,//visible for maxprice dialog
        location: {},
        photos: [],//whether visible for negotation on price
        visiblefordesc: false, //whether visible for description
        value: "0",
        valuefortype: 0,
        valuefordesc: "",
        fromSubmit1: false,
        fromSubmit2: false,
    }
    componentDidMount = () => {
        if (this.props.route.params !== undefined) {
            this.props.route.params.type = 0
        }
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

    saveRoom = () => {
        const { value, photos, location, valuefordesc, valuefortype, ...others } = this.state
        const userdata = {
            price: value,
            location: location,
            roomType: valuefortype,
            roomDescription: valuefordesc,
        }
        if (value != 0 && valuefortype != 0 && photos.length != 0 &&
            !(Object.keys(location).length === 0 && location.constructor === Object) &&
            valuefordesc.trim().length !== 0) {

            // var tm1 = faker.random.uuid();
            // var tm2 = faker.address.zipCode();
            // var uuid = "Room " + tm1 + tm2;

            var mm = photos[0];
            var images = []
            for (var y in mm) {
                images.push(mm[y].uri)
            }
            var uid = firebase.auth().currentUser.uid
            saveOwnerRoom(uid, images, userdata);
            this.clearData();
        }
        else {
            alert('Fill all the data properly.See if all the fields are ticked')
        }
    }

    clearData = () => {
        this.setState({
            visiblefortype: false, //whether room type dialog is visible
            visible: false,//visible for maxprice dialog
            location: {},
            photos: [],//whether visible for negotation on price
            visiblefordesc: false, //whether visible for description
            value: 0,
            valuefortype: 0,
            valuefordesc: "",
            fromSubmit1: true,
            fromSubmit2: true,
        }, () => alert("Done"))
    }

    render() {
        if (this.props.route.params !== undefined) {
            if (this.props.route.params.type === 1 && this.state.photos.length === 0 && !this.state.fromSubmit1) {
                this.setState({
                    ...this.state,
                    photos: [this.props.route.params.photos],
                    fromSubmit: true
                }, () => {
                    this.props.route.params.type = 0
                })
            }
            else if (this.props.route.params.type === 2 && !this.state.fromSubmit2) {
                this.setState({
                    ...this.state,
                    location: this.props.route.params.loc,
                    fromSubmit: true
                }, () => {
                    this.props.route.params.type = 0
                })

            }
            //console.log(this.state)
        }

        return (
            <Provider>
                <View style={styles.container}>
                    <Title style={{
                        fontSize: 30,
                        marginBottom: 60
                    }}>Owner Mode</Title>

                    <Button mode='contained' icon={((Object.keys(this.state.location).length === 0 && this.state.location.constructor === Object)) ? 'map-marker-outline' : 'check-circle'}
                        onPress={() => {
                            this.setState({
                                ...this.state,
                                fromSubmit2: false
                            })
                            this.props.navigation.push('Mmapp', { from: "Add" })
                        }}
                        style={{
                            borderRadius: 30,
                            width: "45%",
                            marginBottom: 20
                        }}
                    >Select area</Button>



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
                        onPress={() => {
                            this.setState({
                                ...this.state,
                                fromSubmit1: false
                            })
                            this.props.navigation.push('SelImages')
                        }}
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
                        onPress={this.saveRoom}
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