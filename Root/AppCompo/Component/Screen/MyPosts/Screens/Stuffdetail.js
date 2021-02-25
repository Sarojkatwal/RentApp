import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { deleteTenantPost } from "../../../../../Firebase/api"

import {
    Card,
    Title,
    Dialog,
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

class Stuffdetail extends Component {
    state = {
        dateCreated: "",
        price: "",
        type: 0,
        location: {},
        visible: false
    }
    componentDidMount = () => {
        if (this.props.stuff !== undefined) {
            this.setState({
                ...this.state,
                price: this.props.stuff.roomData.price,
                type: this.props.stuff.roomData.roomType,
                location: this.props.stuff.roomData.location,
                dateCreated: new Date(this.props.stuff.roomData.dateCreated).toLocaleString()
            })
        }
    }
    deletePost = () => {
        deleteTenantPost(this.props.stuff.key)
        this.props.route.params.doRefresh({ refresh: true })
        this.props.navigation.goBack()
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
                                            <Title>Created At:</Title>
                                            <Caption>{this.state.dateCreated}</Caption>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 20 }}>
                                        <Button mode='contained' onPress={() => this.setState({
                                            ...this.state,
                                            visible: true
                                        })}
                                        > Delete Post</Button>

                                    </View>
                                </Card.Content>
                            </Card>
                            <Portal>
                                <Dialog dismissable={false}
                                    visible={this.state.visible}
                                    onDismiss={() => this.setState({
                                        ...this.state,
                                        visible: false
                                    })}>
                                    <Dialog.Title style={{ fontSize: 30 }}>Alert!!!</Dialog.Title>
                                    <Dialog.Content>
                                        <Paragraph style={{ fontSize: 20 }}>Do you want to delete this post?</Paragraph>
                                    </Dialog.Content>
                                    <Dialog.Actions style={{ justifyContent: "space-between", paddingHorizontal: 25 }}>
                                        <Button onPress={() => this.setState({
                                            ...this.state,
                                            visible: false
                                        }, this.deletePost)}
                                        >Yes
                                        </Button>
                                        <Button onPress={() => this.setState({
                                            ...this.state,
                                            visible: false
                                        })}
                                        >No
                                        </Button>
                                    </Dialog.Actions>

                                </Dialog>
                            </Portal>
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

        justifyContent: 'center'
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
        alignItems: 'center',
        justifyContent: "space-between",
    }
});
