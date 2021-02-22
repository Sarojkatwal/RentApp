import React, { Component } from "react";
import { Avatar, Button, Card, Title, Paragraph, Appbar } from 'react-native-paper';
import { Image, Dimensions, StyleSheet, Text, View } from 'react-native';
//import RNFetchBlob from "rn-fetch-blob";
//import CameraRoll from '@react-native-community/cameraroll';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ShowImage extends Component {
    render() {
        const { uri } = this.props.route.params
        return (
            <View>
                <Appbar.Action icon="keyboard-backspace"
                    style={{ backgroundColor: "white", position: "absolute", top: 10, zIndex: 1 }} size={40}
                    onPress={() => this.props.navigation.goBack()}
                />
                {/* <Appbar.Action icon="download"
                    style={{ backgroundColor: "transparent", position: "absolute", top: 10, right: 10, zIndex: 1 }} size={40}
                    onPress={() => alert("It will download this image")}
        />*/}
                <Image
                    style={styles.simg}
                    source={{ uri: uri }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    simg: {
        width: windowWidth,
        height: windowHeight,
        resizeMode: 'center'
    }
});