import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Add, Main } from "./Omode";

const Stack = createStackNavigator();

class OMode extends React.Component {

    render() {
        const { navigation } = this.props
        return (
            <>
                <Stack.Navigator>
                    <Stack.Screen name="Main" component={Main} options={{
                        headerShown: false,
                    }} />
                    <Stack.Screen name="Add" component={Add} options={{
                        headerShown: false,
                    }} />

                </Stack.Navigator>
            </>
        );
    }
}

export default OMode;
