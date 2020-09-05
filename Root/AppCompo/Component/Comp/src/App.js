import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
//import { NavigationContainer } from "@react-navigation/native";
import Stuffdetail from './Screens/Stuffdetail'
import Stufflist from './Screens/Stufflist'

const Stack3 = createStackNavigator();
export default class App extends Component {

    render() {
        return (

            <>
                <Stack3.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack3.Screen name='stufflist' component={Stufflist} />
                    <Stack3.Screen name='stuffdetail' component={Stuffdetail}
                    />
                </Stack3.Navigator>
            </>

        )
    }
}