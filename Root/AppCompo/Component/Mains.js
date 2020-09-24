import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import {
    Headline,
    Avatar,
    Divider,
    Paragraph,
    Caption,
    Button,
    Dialog
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Homescreen, Setting, Exit, Feedback, Help, RateUs } from './Screen/index'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";

const Stack = createDrawerNavigator();
import UserContext from '../../context'

class CustomDrawerContent extends Component {
    changedp = () => {
        this.props.navigation.navigate('Setting');
    }
    render() {
        return (
            <UserContext.Consumer>
                {data => {
                    const x = data.name
                    const fullname = x.firstName + ' ' + x.lastName
                    const address = data.address
                    return (
                        <View style={{ flex: 1 }}>
                            <DrawerContentScrollView {...this.props}>
                                <View style={{ paddingLeft: 10 }}>

                                    <TouchableOpacity
                                        onPress={this.changedp}>
                                        {(data.profilePic == '') ?
                                            <Avatar.Image size={80} source={require('../../../assets/messi.png')} /> :
                                            <Avatar.Image size={80} source={{ uri: data.profilePic }} />
                                        }
                                        <Paragraph style={{ fontWeight: "bold" }}>{fullname}</Paragraph>
                                        <Caption>{data.email}</Caption>
                                        <Caption>ChisankhuGadhi 4</Caption>
                                        <Caption>{address.district}</Caption>
                                    </TouchableOpacity>
                                    <Button onPress={() => console.log(data)}>Press</Button>
                                </View>
                                <Divider
                                    style={{ backgroundColor: "black", margin: 10, height: 1 }}
                                />
                                <DrawerItemList {...this.props} />
                            </DrawerContentScrollView>
                        </View>
                    )
                }}
            </UserContext.Consumer>
        );
    }
}


export default class Mains extends Component {
    render() {
        return (
            <>
                <Stack.Navigator
                    screenOptions={{
                        swipeEnabled: true,
                    }}
                    drawerStyle={{
                        backgroundColor: "white",
                    }}
                    drawerContent={(props) => <CustomDrawerContent {...props} />}
                >
                    <Stack.Screen
                        name="Home "
                        component={Homescreen}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Icon name="home" color={color} size={size} />
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="Setting"
                        component={Setting}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Icon name="user-cog" color={color} size={size} />
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="Feedback"
                        component={Feedback}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Icon name="comment-dots" color={color} size={size} />
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="Help"
                        component={Help}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Icon name="question-circle" color={color} size={size} />
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="RateUs"
                        component={RateUs}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Icon name="star" color={color} size={size} />
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="SignOut"
                        component={Exit}
                        options={{
                            drawerIcon: ({ color, size }) => (
                                <Icon name="sign-out-alt" color={color} size={size} />
                            ),
                        }}
                    />
                </Stack.Navigator>
            </>
        );
    }
}