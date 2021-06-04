import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import StarRating from 'react-native-star-rating';
import {
    Card,
    Title,
    Avatar,
    Appbar,
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
class ShowProfile extends Component {
    state = {
        name: {},
        address: {},
        pP: "",
        phoneNo: "",
        email: "",
        gender: 'M',
        userName: ""
    }
    empty = "https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png"
    componentDidMount = () => {
        //console.log(this.props.stuff)
        if (this.props.route.params.userdata !== undefined) {
            this.setState({
                ...this.state,
                name: this.props.route.params.userdata.name,
                address: this.props.route.params.userdata.address,
                pP: this.props.route.params.userdata.profilePic,
                username: this.props.route.params.userdata.username,
                phoneNo: this.props.route.params.userdata.phoneNo,
                email: this.props.route.params.userdata.email,
                gender: this.props.route.params.userdata.gender
            })
        }
        else {
            this.setState({
                ...this.state,
                name: this.props.userdata.name,
                address: this.props.userdata.address,
                pP: this.props.userdata.profilePic,
                username: this.props.userdata.username,
                phoneNo: this.props.userdata.phoneNo,
                email: this.props.userdata.email,
                gender: this.props.userdata.gender
            })
        }
    }
    render() {
        return (
            <>
                {this.props.route.params.userdata !== undefined && <Appbar style={{
                    backgroundColor: 'green'
                }}>
                    <Appbar.BackAction onPress={() => {
                        this.props.navigation.goBack()
                    }} />
                    <Appbar.Content title="User Info." />
                </Appbar>}
                < ScrollView >
                    <Card>
                        <View>
                            <TouchableOpacity onPress={() =>
                                this.props.navigation.push('ShowImage',
                                    { uri: this.state.pP.length != 0 ? this.state.pP : this.empty })}>
                                <Avatar.Image style={styles.images}
                                    size={250} source={{
                                        uri: this.state.pP.length !== 0 ?
                                            this.state.pP : this.empty
                                    }} />
                            </TouchableOpacity>
                            <Card.Title
                                title="User Information"
                                titleStyle={{
                                    alignSelf: 'center'
                                }}
                                subtitleStyle={{
                                    alignSelf: 'center'
                                }}
                            />
                        </View>
                        <Divider />
                        <Card.Content>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Title>Firstname</Title>
                                    <Caption>{this.state.name.firstName}</Caption>
                                </View>
                            </View>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Title>Lastname</Title>
                                    <Caption>{this.state.name.lastName}</Caption>
                                </View>
                            </View>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Title>Gender:</Title>
                                    <Caption>{this.state.gender}</Caption>
                                </View>
                            </View>

                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Title>Address:</Title>
                                    <Caption>
                                        {`${this.state.address.district},${this.state.address.zone}`}
                                    </Caption>
                                </View>
                            </View>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Title>Email:</Title>
                                    <Caption>{this.state.email}</Caption>
                                </View>
                            </View>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Title>Username:</Title>
                                    <Caption>{this.state.username}</Caption>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                </ScrollView >
            </>
        );
    }
}

export default ShowProfile;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    images: {
        //marginTop: 1,
        // height: 273,
        // width: '100%',
        alignSelf: 'center'
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
