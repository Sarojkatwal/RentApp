import React, { Component } from "react";
import { View, Text, StatusBar, StyleSheet, Image, Button } from "react-native";
import { List, Caption, Appbar } from "react-native-paper";
import Stufflist from './MyPosts/Screens/Stufflist'
import { useIsFocused } from '@react-navigation/native';

export default function MyPosts(props) {
    return (
        <>
            <Appbar style={{ backgroundColor: "green" }}>
                <Appbar.BackAction onPress={() => props.navigation.goBack()} color="blue" />
                <Appbar.Content title="My Posts" color="blue" />
            </Appbar>
            <Stufflist {...props} />
        </>
    );
}
