import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import {
    Provider,
    Portal,
    Avatar,
    Divider,
    Paragraph,
    Caption,
    Button,
    Dialog
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Homescreen, Profilescreen, Setting, Exit, Feedback, Help, RateUs } from './Screen/index'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import UserContext from '../../context'

const Stack = createDrawerNavigator();

class CustomDrawerContent extends Component {
    changedp = () => {
        this.props.navigation.navigate('Setting');
    }
    render() {
        return (
            <UserContext.Consumer>
                {data => {
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

                                        <Paragraph style={{ fontWeight: "bold" }}>SAROJ KATWAL</Paragraph>
                                        <Caption>@katwalsaroj11</Caption>
                                        <Caption>54 Following</Caption>
                                        <Caption>4 Followers</Caption>
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
export default class Main extends Component {
    constructor() {
        super()
        global.Show = true
    }
    render() {
        return (
            <>
                <Stack.Navigator
                    initialRouteName="Home"
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
