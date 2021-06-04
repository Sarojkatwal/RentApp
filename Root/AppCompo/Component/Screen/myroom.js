import React, { Component } from "react";
import { View, Text, StatusBar, StyleSheet, Image, Button } from "react-native";
import { List, Caption, Appbar } from "react-native-paper";
import Stufflist from './MyRooms/Screens/Stufflist'
import { useIsFocused } from '@react-navigation/native';
import UserContext from '../../../context'

export default function MyRooms(props) {
    return (
        <UserContext.Consumer>
            {data => {
                return (
                    <>
                        <Appbar style={{ backgroundColor: "green" }}>
                            <Appbar.BackAction color="blue" onPress={() => props.navigation.goBack()} />
                            <Appbar.Content title="My Rooms" color="blue" />
                        </Appbar>
                        <Stufflist {...props} udata={data} />
                    </>
                )
            }
            }
        </UserContext.Consumer>
    );
}


