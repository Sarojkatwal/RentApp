import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import StarRating from 'react-native-star-rating';
import {
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
    Modal
} from "react-native-paper";
import call from 'react-native-phone-call';
import { sendPushNotification } from '../../../../../../Firebase/pushnotification'
import firebase from '../../../../../../Firebase/Firebase'
import { create_matchingRoomNotifications } from '../../../../../../Firebase/notify'
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
        distance: 0,
        matchedTo: null,
        authorId: null
    }
    componentDidMount = () => {
        //console.log(this.props.stuff.matchedTo)
        if (this.props.stuff.roomInformation.roomData !== undefined) {
            this.setState({
                ...this.state,
                price: this.props.stuff.roomInformation.roomData.price,
                type: this.props.stuff.roomInformation.roomData.roomType,
                location: this.props.stuff.roomInformation.roomData.location.name,
                description: this.props.stuff.roomInformation.roomData.roomDescription,
                img: this.props.stuff.roominfo,
                noofpic: this.props.stuff.roominfo.length,
                authorId: this.props.stuff.roomInformation.authorId
            })
        }
    }

    createAlert = () =>
        Alert.alert(
            "Alert!!!!!!!",
            "Do you  want to call to the room owner?",
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
    handleclick = (x) => {
        x ? (this.state.a != 700 &&
            this.setState({
                a: this.state.a - 1
            })
        )
            :
            (this.state.a != 700 + this.state.noofpic - 1 &&
                this.setState({
                    a: this.state.a + 1
                })
            )
    }
    handleRequest = () => {
        // console.log(this.props.stuff.roomInformation.authorId)
        alert('sent notification')
        const sendTo = this.props.stuff.roomInformation.authorId
        // console.log("sending to "+sendTo)
        const name = firebase.auth().currentUser.email.replace('@rent.com', '')

        const msg = ' Your room in  ' + this.state.location + " has been requested  from  " + name
        sendPushNotification(sendTo, msg)
        create_matchingRoomNotifications(this.props.stuff.matchedToId, sendTo, 2, false)
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
                < ScrollView >
                    <Card>
                        <TouchableOpacity onPress={() => this.props.navigation.push('ShowImage', { uri: this.state.img[this.state.a - 700] })}>
                            <Card.Cover source={{ uri: this.state.img[this.state.a - 700] }} style={styles.images} />
                        </TouchableOpacity>
                        <Card.Title
                            title="Some Photos"
                            subtitle={`PhotoNo ${this.state.a - 699}`}
                            titleStyle={{
                                alignSelf: 'center'
                            }}
                            subtitleStyle={{
                                alignSelf: 'center'
                            }}
                            left={(props) =>
                                <IconButton {...props} size={40} color={this.state.a == 700 ? 'grey' : 'white'} icon="skip-previous-circle"
                                    style={{
                                        top: -60,
                                        left: -20,
                                        zIndex: 1
                                    }
                                    }
                                    onPress={() => this.handleclick(true)}
                                />}
                            right={(props) =>
                                <IconButton {...props} size={40} color={this.state.a == 700 + this.state.noofpic - 1 ? 'grey' : 'white'} icon="skip-next-circle"
                                    style={{
                                        top: -60,
                                        right: -5,
                                        zIndex: 1
                                    }
                                    }
                                    onPress={() => this.handleclick(false)}
                                />}
                        />
                        <Divider />
                        <Card.Content>

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
                                    <Title>Location:</Title>
                                    <TouchableOpacity onPress={() =>
                                        this.props.navigation.navigate('ShowMap', { location: this.props.stuff.roomInformation.roomData.location })}>
                                        <Caption>
                                            {this.state.location}
                                        </Caption>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {(this.props.stuff.from == undefined) &&
                                <>
                                    <View style={styles.a1}>
                                        <View style={styles.a2}>
                                            <Title>Distance:</Title>
                                            <Caption> {this.props.stuff.ratings.distance} km</Caption>
                                        </View>
                                    </View>
                                    <View style={styles.a1}>
                                        <View style={styles.a2}>
                                            <Title>Matched To:</Title>
                                            <Caption> {this.props.stuff.matchedTo} </Caption>
                                        </View>
                                    </View>
                                </>
                            }
                            {/* <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Title>Rating:</Title>
                                    <StarRating
                                        disabled={true}
                                        maxStars={5}
                                        rating={this.state.starcount}
                                        selectedStar={(starcount) => this.setState({ starcount })}
                                    />
                                </View>
                            </View> */}

                            <List.Accordion title="Description"
                                titleStyle={{
                                    fontSize: 20,
                                    left: -15,
                                    fontWeight: 'bold'
                                }}
                            >
                                <Text style={styles.textfordesc}>
                                    {this.state.description}
                                </Text>
                            </List.Accordion>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Button mode='contained'
                                        onPress={this.createAlert}
                                    > Call</Button>
                                    {(this.props.stuff.from == undefined) &&
                                        <Button mode='contained'
                                            onPress={this.handleRequest}
                                        > Send Request</Button>}

                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                </ScrollView >
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
        marginTop: 1,
        height: 273,
        width: '100%',
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
