import React, { Component } from "react";
import { Image, View, Platform, Text, StyleSheet } from 'react-native';
import { List, Avatar, Appbar, Button } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { uploadProfile } from '../../../Firebase/storage';
export class ChangeDp extends Component {
    state = {
        image: null,
        next: 'ChangeDp'
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
            //console.log(result);
        } catch (E) {
            console.log(E);
        }
    };
    changedp = () => {
        this.getPermissionAsync();
        this.setState({
            next: 'changedp'
        })
    }
    savedp = async () => {
        //write code to save image to database
        //global.dp = this.state.image;
        const response = await fetch(this.state.image);
        const blob = await response.blob();
        uploadProfile(blob)
        this.props.navigation.goBack()
    }
    render() {
        return (
            <>
                <View style={styles.container}>
                    <Appbar style={{ backgroundColor: 'green' }}>
                        <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                        <Appbar.Content title="ChangeDp" />
                    </Appbar>
                    <View>
                        <Button onPress={this._pickImage}>Pick an image</Button>
                        {this.state.image && <Avatar.Image size={180}
                            source={{ uri: this.state.image }} style={styles.image} />}
                    </View>
                    {this.state.image != null &&
                        <View style={styles.a1}>
                            <View style={styles.a2}>
                                <Button style={styles.button}
                                    mode='contained'
                                    onPress={this._pickImage}
                                > Choose Other</Button>
                                <Button style={styles.button}
                                    mode='contained'
                                    onPress={this.savedp}
                                > Ok</Button>
                            </View>
                        </View>
                    }
                </View>
            </>
        );
    }
}

export default ChangeDp;
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
