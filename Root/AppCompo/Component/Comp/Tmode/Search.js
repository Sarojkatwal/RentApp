import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput, Dialog, Portal, RadioButton, Title, Provider, Snackbar } from 'react-native-paper'
import faker from 'faker'
import firebase from '../../../../Firebase/Firebase'
import { saveTenantPost } from '../../../../Firebase/api'

class Search extends Component {
    state = {
        visiblefortype: false, //whether room type dialog is visible
        visible: false,//visible for maxprice dialog
        value: "0",
        valuefortype: 0,
        location: {}
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


    searchRooms = () => {
        const { value, valuefortype, location, ...others } = this.state
        //console.log(this.state);
        //if found set true
        if (false) {
            this.props.navigation.push('Find', {
                screen: 'stufflist',
                params: { user: 'jane' }
            })
        }
        //Saving tanant post
        const tpost = {
            dateCreated: new Date().getTime(),
            price: value,
            roomType: valuefortype,
            location: location
        }
        if (value != 0 && valuefortype != 0 &&
            !(Object.keys(location).length === 0 && location.constructor === Object)
        ) {
            var uid = firebase.auth().currentUser.uid
            // var tm1 = faker.random.uuid();
            // var tm2 = faker.address.zipCode();
            // var uuid = "Post " + tm1 + tm2;
            saveTenantPost(uid, tpost);
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
            value: 0,
            valuefortype: 0,
            location: {}
        }, () => alert("Done"))
    }

    render() {
        if (this.props.route.params !== undefined) {
            if (Object.keys(this.state.location).length === 0 && this.state.location.constructor === Object && this.props.route.params.type == 2) {
                this.setState({
                    ...this.state,
                    location: this.props.route.params.loc
                }, () => {
                    this.props.route.params.type = 0
                })
            }
        }
        //console.log(this.state)
        return (
            <Provider>
                <View style={styles.container}>

                    <Title style={{
                        fontSize: 30,
                        marginBottom: 60
                    }}>Tenant Mode</Title>

                    <Button mode='contained' icon={((Object.keys(this.state.location).length === 0 && this.state.location.constructor === Object)) ? 'map-marker-outline' : 'check-circle'}
                        onPress={() => this.props.navigation.push('Mmapp', { from: "Search" })}
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
                                    placeholder="5000"
                                    keyboardType='numeric'
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
                    <Button mode='contained' icon='web'
                        style={{
                            backgroundColor: 'green',
                            borderRadius: 30,
                            width: "45%",
                            marginBottom: 20
                        }}
                        onPress={this.searchRooms}

                    >Save Post</Button>
                </View>

            </Provider>

        );
    }
}

export default Search;

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