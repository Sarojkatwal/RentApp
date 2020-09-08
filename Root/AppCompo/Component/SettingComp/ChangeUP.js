import React, { Component } from "react";
import { Image, View, Platform, Text, StyleSheet } from 'react-native';
import { List, Avatar, Appbar, Button } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export class ChangeUP extends Component {
    state = {
        image: null,
        next: 'ChangeUP'
    };

    getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };
    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                //allowsEditing: true,
                //aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };
    ChangeUP = () => {
        this.getPermissionAsync();
        this.setState({
            next: 'ChangeUP'
        })
    }
    savedp = () => {
        //write code to save image to database
        global.dp = this.state.image
        this.setState({
            ...this.state,
            next: 'ChangeUP'
        })
    }
    render() {
        return (
            <>
                <View style={styles.container}>
                    <Appbar style={{ backgroundColor: 'green' }}>
                        <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                        <Appbar.Content title="Setting" />
                        <Appbar.Action icon="dots-vertical" />
                    </Appbar>
                    <Text>Saroj</Text>
                </View>
            </>
        );
    }
}

export default ChangeUP;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    a1: {
        marginTop: 30,
        marginHorizontal: 10,
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    a2: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: 'green',
        borderRadius: 20
    }
})
