import React from "react";
import { View, Image, Text, StatusBar, StyleSheet } from "react-native";
import { Appbar, Button, IconButton } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TMode, OMode } from "../Comp/index";

const Stack2 = createBottomTabNavigator();

export default function Homescreen({ navigation }) {
  return (
    <>
      <StatusBar backgroundColor='green' />
      <Appbar style={{ backgroundColor: "green" }}>
        <IconButton
          icon='format-list-bulleted'
          color='white'
          onPress={() => navigation.openDrawer()}
        ></IconButton>
        <Appbar.Content style={{ left: -10 }} title="Room Rental App" />
        <View style={styles.a1}>
          {true ? <Appbar.Action
            icon="bell-ring"
            color="red"
            onPress={() => navigation.navigate('ShowNotification')}
          /> :
            <Appbar.Action
              icon="bell-ring-outline"
              color="white"
              onPress={() => alert("Hy")}
            />}
        </View>
      </Appbar>
      <Stack2.Navigator
        initialRouteName="O-Mode"
        removeClippedSubviews={true}
        backBehavior="initialRoute"
        tabBarOptions={{
          showIcon: true,
          activeTintColor: "blue",
          activeBackgroundColor: "pink",
          inactiveTintColor: "black",
          labelPosition: "below-icon",
          allowFontScaling: false,
        }}
      >
        <Stack2.Screen
          name="O-Mode"
          component={OMode}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        ></Stack2.Screen>
        <Stack2.Screen
          name="T-Mode"
          component={TMode}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Icon name="male" size={size} color={color} />
            ),
          }}
        ></Stack2.Screen>
      </Stack2.Navigator>
    </>
  );
}
const styles = StyleSheet.create({
  a1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
