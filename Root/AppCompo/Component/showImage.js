import React, { Component } from "react";
import { Avatar, Button, Card, Title, Paragraph, Appbar } from 'react-native-paper';
import { Image, Dimensions, StyleSheet, Text, View } from 'react-native';
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
                <Image
                    style={styles.stretch}
                    source={{ uri: uri }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    stretch: {
        width: windowWidth,
        height: windowHeight,
        resizeMode: 'center'
    }
});

