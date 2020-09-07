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
import { Add, Main } from "./Omode";

const Stack = createStackNavigator();

class OMode extends React.Component {

    render() {
        return (
            <>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="Main" component={Main} />
                    <Stack.Screen name="Add" component={Add} />
                </Stack.Navigator>
            </>
        );
    }
}

export default OMode;
