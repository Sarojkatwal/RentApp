import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    Alert,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Search, Find, Main } from "./Tmode";

const Stack = createStackNavigator();

class TMode extends React.Component {

    render() {
        return (
            <>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="Main" component={Main} />
                    <Stack.Screen name="Search" component={Search} />
                    <Stack.Screen name="Find" component={Find} />
                </Stack.Navigator>
            </>
        );
    }
}

export default TMode;
