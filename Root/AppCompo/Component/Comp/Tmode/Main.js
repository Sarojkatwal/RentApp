import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
//import { NavigationContainer } from "@react-navigation/native";
import Stuffdetail from './src/Screens/Stuffdetail'
import Stufflist from './src/Screens/Stufflist'

const Stack3 = createStackNavigator();
export default class Main extends Component {

    render() {
        return (
            <Stufflist {...this.props} />
        )
    }
}