import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native'
import {
    Title,
    Dialog,
    RadioButton,
    Caption,
    List,
    Provider,
    Portal,
    Divider,
    Headline,
    Button,
    TextInput
} from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import { dist } from './dis'
import { saveUsersData } from '../../Firebase/api'
import firebase from '../../Firebase/Firebase'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export class FillDetails extends Component {
    state = {
        firstname: '',
        lastname: '',
        gender: 'M',
        zone: 'zone',
        district: 'District',
        phoneno: '',
        ge: false,
        pe: false,
        de: false,
    }
    componentDidMount = () => {
        // console.log(dist.bagmati)
    }
    submitdata = () => {
        const userdata = {
            name: {
                firstName: this.state.firstname,
                lastName: this.state.lastname,
            },
            gender: this.state.gender,
            phoneNo: this.state.phoneno,
            address:
            {
                zone: this.state.zone,
                district: this.state.district,
            },
        }
        const { firstname, lastname, zone, district, phoneno, ...others } = this.state
        if (firstname !== '' && lastname !== '' && phoneno !== '' && zone !== 'zone' && district !== 'District') {
            const uid = firebase.auth().currentUser.uid
            saveUsersData(uid, userdata)
        }
        else {
            alert('Fill all the data properly')
        }
    }
    render() {
        const zones = []
        for (var x in dist) {
            zones.push(x)
        }
        const zone = zones.map((data, key) =>
            <RadioButton.Item key={key} label={`${key + 1}.${data[0].toUpperCase() + data.slice(1)}`} value={data} color='red' />
        )
        var district = []
        if (this.state.zone != 'zone') {
            const districts = []
            for (var x in dist[this.state.zone]) {
                districts.push(dist[this.state.zone][x].district)
            }
            district = districts.map((data, key) =>
                <RadioButton.Item key={key} label={`${key + 1}.${data[0].toUpperCase() + data.slice(1)}`} value={data} color='red' />
            )
        }

        return (
            <Provider>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.a1}>
                            <Title>FirstName:</Title>
                            <TextInput
                                style={styles.textInput}
                                mode="outlined"
                                onChangeText={(firstname) => this.setState({ firstname })}
                                value={`${this.state.firstname}`}
                            />
                        </View>
                        <View style={styles.a1}>
                            <Title>LastName:</Title>
                            <TextInput
                                style={styles.textInput}
                                mode="outlined"
                                onChangeText={(lastname) => this.setState({ lastname })}
                                value={`${this.state.lastname}`}
                            />
                        </View>
                        <View style={styles.a1}>
                            <Title>Phone No:</Title>
                            <TextInput
                                style={styles.textInput}
                                mode="outlined"
                                onChangeText={(phoneno) => this.setState({ phoneno })}
                                value={`${this.state.phoneno}`}
                            />
                        </View>
                        <View style={styles.a1}>
                            <Title>Gender:</Title>
                            <TouchableOpacity style={styles.TouchableOpacity}
                                onPress={() => this.setState({ ge: true })}>
                                <View style={styles.tview}>
                                    <Caption style={styles.ttext}>{this.state.gender}</Caption>
                                    <Feather name="chevron-down" color="black" size={20} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Portal>
                            <Dialog visible={this.state.ge} dismissable={false}
                                onDismiss={() => this.setState({ ge: false })}
                            >
                                <Dialog.Title>Select Gender</Dialog.Title>
                                <Dialog.Content>
                                    <RadioButton.Group
                                        onValueChange={(x) => this.setState({ gender: x })}
                                        value={this.state.gender}
                                    >
                                        <RadioButton.Item label="Male" value='M' color='red' />
                                        <RadioButton.Item label="Female" value='F' color='red' />
                                        <RadioButton.Item label="Other" value='O' color='red' />

                                    </RadioButton.Group>
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Button onPress={() => this.setState({ ge: false })}>
                                        Done
                                </Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>
                        <View style={styles.a1}>
                            <Title>Zone:</Title>
                            <TouchableOpacity style={styles.TouchableOpacity}
                                onPress={() => this.setState({ pe: true })}>

                                <View style={styles.tview}>
                                    <Caption style={styles.ttext}>{this.state.zone.toUpperCase()}</Caption>
                                    <Feather name="chevron-down" color="black" size={20} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Portal>
                            <Dialog visible={this.state.pe} dismissable={false}
                                onDismiss={() => this.setState({ pe: false })}
                                style={styles.scrollviewStyle}
                            >
                                <Dialog.Title>Select zone</Dialog.Title>
                                <ScrollView>
                                    <Dialog.Content>
                                        <RadioButton.Group
                                            onValueChange={(x) => this.setState({ zone: x })}
                                            value={this.state.zone}
                                        >
                                            {zone}
                                        </RadioButton.Group>
                                    </Dialog.Content>
                                </ScrollView>
                                <Divider />
                                <Dialog.Actions>
                                    <Button onPress={() => this.setState({ pe: false })}>
                                        Done
                                </Button>
                                </Dialog.Actions>

                            </Dialog>
                        </Portal>
                        <View style={styles.a1}>
                            <Title>District:</Title>
                            <TouchableOpacity style={styles.TouchableOpacity}
                                onPress={() => {
                                    if (this.state.zone != 'zone') {
                                        this.setState({ de: true })
                                    }
                                }}>

                                <View style={styles.tview}>
                                    <Caption style={styles.ttext}>{this.state.district.toUpperCase()}</Caption>
                                    <Feather name="chevron-down" color="black" size={20} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Portal>
                            <Dialog visible={this.state.de} dismissable={false}
                                onDismiss={() => this.setState({ de: false })}
                                style={styles.scrollviewStyle}
                            >
                                <Dialog.Title>Select district</Dialog.Title>
                                <ScrollView>
                                    <Dialog.Content>
                                        <RadioButton.Group
                                            onValueChange={(x) => this.setState({ district: x })}
                                            value={this.state.district}
                                        >
                                            {district}
                                        </RadioButton.Group>
                                    </Dialog.Content>
                                </ScrollView>
                                <Divider />
                                <Dialog.Actions>
                                    <Button onPress={() => this.setState({ de: false })}>Done</Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>

                        <View style={{
                            marginTop: 40,
                            marginBottom: 20
                        }}>
                            <Button
                                mode='contained'
                                onPress={this.submitdata}>
                                Submit
                        </Button>
                        </View>
                    </ScrollView>
                </View>
            </Provider >
        )
    }
}

export default FillDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        margin: '5%',
        borderColor: 'green',
        borderWidth: 5,
        marginVertical: windowHeight / 20,
        backgroundColor: 'skyblue',
        paddingHorizontal: 10,
        borderRadius: 20,
        justifyContent: 'center'
    },
    TouchableOpacity: {
        borderColor: 'black',
        borderWidth: 1,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center'
    },
    ttext: {
        fontSize: 20,
        paddingLeft: 5
    },
    tview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4
    },
    images: {
        marginTop: 1,
        height: 273,
        width: '100%',
    },
    profile: {
        position: 'absolute',
        zIndex: 1,
        right: 0,
        bottom: 0,
        margin: 10,
        backgroundColor: 'transparent',
        borderColor: 'grey',
        borderWidth: 1
    },
    a1: {
        marginBottom: 10
    },
    scrollviewStyle: {
        marginVertical: windowHeight / 8,
        borderRadius: 20
    },
    textInput: {
        height: 40,
        width: "100%",
    }
});