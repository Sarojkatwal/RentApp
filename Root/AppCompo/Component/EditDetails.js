import React, { Component } from "react";
import { Alert, StyleSheet, Text, View, Picker } from 'react-native';
import {
    Appbar,
    Card,
    Title,
    IconButton,
    Paragraph,
    Headline,
    Subheading,
    Caption,
    Button,
    Divider,
    Avatar,
    List,
    Provider,
    Portal,
    Modal,
    TextInput
} from "react-native-paper";
import { saveUsersData } from '../../Firebase/api'
import firebase from '../../Firebase/Firebase'
class Editdetails extends Component {
    state = {
        visible: false,
        roomtype: 0,
        price: "",
        location: '',
        description: ""
    }
    componentDidMount = () => {
        if (this.props.roomData !== undefined) {
            this.setState({
                ...this.state,
                price: this.props.roomData.price,
                roomtype: this.props.roomData.roomType,
                description: this.props.roomData.roomDescription,
                location: this.props.roomData.location.name
            })
        }


    }
    submitData = () => {
        const uid = this.props.keys
        const roomdata = {
            price: this.state.price,
            roomType: this.state.roomtype,
            roomDescription: this.state.description,
            location: this.props.roomData.location
        }
        //console.log(uid)

        firebase.firestore().collection('ownerPost').doc(uid).
            set({ roomData: roomdata }, { merge: true })
            .then(() => {
                alert("Done")
            }).then(() => this.props.navigation.goBack())
            .catch((err) => console.log('Error is here'))
    }
    createButtonAlert = () =>
        Alert.alert(
            "Alert!!!!!!!",
            "Do you really want to submit?",
            [
                {
                    text: "Submit",
                    onPress: this.submitData
                },
                {
                    text: "Cancel",
                    style: "cancel"
                },
            ],
            { cancelable: false }
        );
    render() {
        return (
            <Card.Content>
                <View style={styles.a1}>
                    <View style={styles.a2}>
                        <Title>Price:</Title>
                        <TextInput
                            style={styles.textInput}
                            mode="outlined"
                            keyboardType='numeric'
                            //label={this.state.price}
                            onChangeText={(price) => this.setState({ price })}
                            value={this.state.price}
                            maxLength={10}  //setting limit of input
                        />
                    </View>
                </View>
                <View style={styles.a1}>
                    <View style={styles.a2}>
                        <Title>Type:</Title>
                        <Picker style={styles.pickerStyle}
                            mode='dropdown'
                            selectedValue={this.state.roomtype}
                            onValueChange={(itemValue, itemPosition) =>
                                this.setState({ roomtype: itemValue })}
                        >
                            <Picker.Item label="Single" value={1} />
                            <Picker.Item label="Double" value={2} />
                            <Picker.Item label="Flat" value={3} />
                        </Picker>
                    </View>
                </View>

                <View style={styles.a1}>
                    <View style={styles.a2}>
                        <Title>Location:</Title>
                        <Caption>{this.state.location}</Caption>
                    </View>
                </View>
                <List.Accordion title="Description"
                    titleStyle={{
                        fontSize: 20,
                        left: -15,
                        fontWeight: 'bold'
                    }}
                >
                    <TextInput
                        onChangeText={(description) => this.setState({ description })}
                        value={this.state.description}
                        multiline={true}
                        numberOfLines={5}
                    />
                </List.Accordion>
                <View style={styles.a1}>
                    <View style={{ marginTop: 15, marginBottom: 10 }}>
                        <Button mode='contained' onPress={this.createButtonAlert}
                        > Submit Change</Button>
                    </View>
                </View>
            </Card.Content>

        );
    }
}

export default Editdetails;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    images: {
        marginTop: 1,
        height: 273,
        width: '100%',
    },
    textfordesc: {
        margin: 12,
        fontSize: 16,
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
    description: {
        margin: 10,
    },
    a1: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",

    },
    a2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    pickerStyle: {

        width: "50%",
        color: '#344953',
    },
    textInput: {
        height: 40,
        width: "50%",
    }
});
