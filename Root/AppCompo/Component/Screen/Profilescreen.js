import React, { Component } from "react";
import { View, Text, StatusBar, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, List, Caption, Appbar } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

export default class Profilescreen extends Component {
  render() {
    return (
      <Appbar>
        <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
        <Appbar.Content title="Title" subtitle="Subtitle" />
        <Appbar.Action icon="magnify" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar>
    );
  }
}
