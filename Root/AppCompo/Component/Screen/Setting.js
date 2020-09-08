import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { List, Avatar, Appbar, Button } from "react-native-paper";
import { createStackNavigator } from '@react-navigation/stack'
import { ChangeDp, ChangeUP, Settinghome } from '../SettingComp'

const Stack = createStackNavigator();
export default class Setting extends Component {
  render() {
    return (
      <>
        < Stack.Navigator
          //initialRouteName='Settinghome'
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name='Settinghome' component={Settinghome} />
          <Stack.Screen name='Changeup' component={ChangeUP} />
          <Stack.Screen name='Changedp' component={ChangeDp} />
        </ Stack.Navigator>
      </>
    )
  }
}
