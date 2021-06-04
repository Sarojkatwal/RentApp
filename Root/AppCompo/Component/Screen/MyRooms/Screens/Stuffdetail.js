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
    Switch,
    List,
    Provider,
    Portal,
    Modal
} from "react-native-paper";
import Editdetails from '../../../EditDetails'
import firebase from '../../../../../Firebase/Firebase'
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
        isSwitchOn: false
    }
    componentDidMount = () => {
        //console.log("Here>>>>>>>", this.props.stuff)
        if (this.props.stuff.roomData !== undefined) {
            this.setState({
                ...this.state,
                price: this.props.stuff.roomData.price,
                type: this.props.stuff.roomData.roomType,
                location: this.props.stuff.roomData.location.name,
                description: this.props.stuff.roomData.roomDescription,
                img: this.props.stuff.roomimg,
                noofpic: this.props.stuff.roomimg.length
            })
        }
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
    createAlert = () =>
        Alert.alert(
            "Alert!!!!!!!",
            "Do you really want to delete this room?",
            [
                {
                    text: "Delete",
                    onPress: this.deleteCollection
                },
                {
                    text: "Cancel",
                    style: "cancel"
                },
            ],
            { cancelable: false }
        );
    deleteRoom = async (batchSize = this.state.noofpic) => {
        const id = this.props.stuff.key;
        const ref = firebase
            .firestore()
            .collection("ownerPost")
            .doc(id)
            .collection("roomImg");
        ref
            .get()
            .then((docs) => {
                docs.forEach((doc) => {
                    ref.doc(doc.id).delete();
                });
                firebase
                    .firestore()
                    .collection("ownerPost")
                    .doc(id)
                    .delete()
                    .then(() => this.props.navigation.goBack())
                    .catch((err) => {
                        throw err;
                    });
            })
            .catch((err) => {
                throw err;
            });
    };
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
                        <View>
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
                            <View style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                zIndex: 1,
                                //flexDirection: 'row'

                            }}>
                                <Caption>Edit mode</Caption>
                                <Switch value={this.state.isSwitchOn} onValueChange={() => this.setState({
                                    ...this.state,
                                    isSwitchOn: !this.state.isSwitchOn
                                })} />
                            </View>
                        </View>
                        <Divider />
                        {!this.state.isSwitchOn ? <Card.Content>
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
                                        this.props.navigation.navigate('ShowMap', { location: this.props.stuff.roomData.location })}>
                                        <Caption>
                                            {this.state.location}
                                        </Caption>
                                    </TouchableOpacity>

                                </View>
                            </View>
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
                                        color="red"
                                        onPress={this.createAlert}
                                    > Delete Room</Button>

                                </View>
                            </View>
                        </Card.Content> : <Editdetails {...this.props} keys={this.props.stuff.key} roomData={this.props.stuff.roomData}></Editdetails>}
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
