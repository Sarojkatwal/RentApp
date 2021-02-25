import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import StarRating from 'react-native-star-rating';
import {
    Card,
    Title,
    IconButton,
    Paragraph,
    Headline,
    Dialog,
    Caption,
    Button,
    Divider,
    Avatar,
    List,
    Provider,
    Portal,
    Modal
} from "react-native-paper";
import call from 'react-native-phone-call';
class Stuffdetail extends Component {
    state = {
        a: 700,
        starcount: 0,
        price: "",
        type: 0,
        location: "",
        description: "",
        img: [],
        noofpic: 0,
    }
    componentDidMount = () => {
        //console.log(this.props.stuff)
        if (this.props.stuff.roomInformation.roomData !== undefined) {
            this.setState({
                ...this.state,
                price: this.props.stuff.roomInformation.roomData.price,
                type: this.props.stuff.roomInformation.roomData.roomType,
                location: this.props.stuff.roomInformation.roomData.location,
                dateCreated: new Date(this.props.stuff.roomInformation.roomData.dateCreated).toLocaleString()
            })
        }

    }
    createAlert = () =>
        Alert.alert(
            "Alert!!!!!!!",
            "Do you  want to call to the post owner?",
            [
                {
                    text: "Call",
                    onPress: () => this.doCall(this.props.stuff.userinfo.phoneNo)
                },
                {
                    text: "Cancel",
                    style: "cancel"
                },
            ],
            { cancelable: false }
        );
    doCall = (val) => {
        if (val.length !== 10) {
            alert('No correct phone number available!!');
            return;
        }
        const args = {
            number: val,
            prompt: true,
        };
        // Make a call
        call(args).catch(console.error);
    }

    render() {
        const { stuff } = this.props;
        var Rtype = ""
        if (this.state.type == 1) {
            Rtype = "Single Room"
        }
        else if (this.state.type == 2) {
            Rtype = "Double Room"
        }
        else {
            Rtype = "Flat"
        }
        return (
            <>
                <Provider>
                    < ScrollView >
                        <View style={styles.container}>
                            <Card>
                                <Card.Content>
                                    <TouchableOpacity onPress={() =>
                                        this.props.navigation.push('ShowProfile',
                                            { userdata: this.props.stuff.userinfo })}>
                                        <Avatar.Image style={styles.images}
                                            size={150} source={{
                                                uri: this.props.stuff.userinfo.profilePic
                                            }} />
                                    </TouchableOpacity>
                                    <View style={styles.a1}>
                                        <View style={styles.a2}>
                                            <Title>Price:</Title>
                                            <Caption>Rs. {this.state.price}</Caption>
                                        </View>
                                    </View>
                                    <View style={styles.a1}>
                                        <View style={styles.a2}>
                                            <Title>Type:</Title>
                                            <Caption>{Rtype}</Caption>
                                        </View>
                                    </View>
                                    <View style={styles.a1}>
                                        <View style={styles.a2}>
                                            <Title>Latitude:</Title>
                                            <Caption>{this.state.location.latitude}</Caption>
                                        </View>
                                    </View>
                                    <View style={styles.a1}>
                                        <View style={styles.a2}>
                                            <Title>Longitude:</Title>
                                            <Caption>{this.state.location.longitude}</Caption>
                                        </View>
                                    </View>
                                    <View style={styles.a1}>
                                        <View style={styles.a2}>
                                            <Title>Place:</Title>
                                            <TouchableOpacity onPress={() =>
                                                this.props.navigation.navigate('ShowMap', { location: this.state.location })}>
                                                <Caption>
                                                    {this.state.location.name}
                                                </Caption>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.a1}>
                                        <View style={styles.a2}>
                                            <Title>Created At:</Title>
                                            <Caption>{this.state.dateCreated}</Caption>
                                        </View>
                                    </View>

                                    <View style={{ marginTop: 20 }}>
                                        <Button mode='contained' onPress={this.createAlert}
                                        > Call</Button>
                                    </View>
                                </Card.Content>
                            </Card>
                        </View>
                    </ScrollView >
                </Provider>
            </>
        );
    }
}

export default Stuffdetail;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    images: {
        alignSelf: 'center',
    },
    textfordesc: {
        margin: 12,
        fontSize: 16,
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
    }
});
