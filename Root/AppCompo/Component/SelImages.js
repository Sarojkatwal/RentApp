import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageBrowser } from 'expo-image-picker-multiple';
import { Appbar, Snackbar } from 'react-native-paper'

export default class SelImages extends Component {
    state = {
        heading: 'Selected 0 Images',
        loading: false
    }
    imagesCallback = (callback) => {
        const { navigation } = this.props;
        callback.then(async (photos) => {
            const cPhotos = [];
            for (let photo of photos) {
                const pPhoto = await this._processImageAsync(photo.uri);
                cPhotos.push({
                    uri: pPhoto.uri,
                    name: photo.filename,
                    type: 'image/jpg'
                })
            }
            //alert(cPhotos)
            navigation.navigate('Add', { photos: cPhotos, type: 1 });
        })
            .catch((e) => console.log(e))
    };

    async _processImageAsync(uri) {
        const file = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 1000 } }],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
        return file;
    }
    x = () => { }
    updateHandler = (count, onSubmit) => {
        this.setState({
            heading: `Selected ${count} pictures`,
            loading: false,
        })
        this.x = {}
        if (count >= 1) {
            this.setState({
                heading: `Selected ${count} pictures`,
                loading: true,
            })
            this.x = onSubmit
        }
    };

    renderSelectedComponent = (number) => (
        <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{number}</Text>
        </View>
    );
    render() {
        const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;

        return (
            <View style={[styles.flex, styles.container]}>
                <Snackbar visibile={true}>Here we go</Snackbar>
                <Appbar style={{ backgroundColor: 'green' }}>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title={this.state.heading} />
                    {this.state.loading &&
                        <Appbar.Action icon="checkbox-marked-circle" onPress={this.x}
                        />
                    }
                </Appbar>
                <ImageBrowser
                    max={10}
                    onChange={this.updateHandler}
                    callback={this.imagesCallback}
                    renderSelectedComponent={this.renderSelectedComponent}
                    emptyStayComponent={emptyStayComponent}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    container: {
        position: 'relative'
    },
    emptyStay: {
        textAlign: 'center',
    },
    countBadge: {
        paddingHorizontal: 8.6,
        paddingVertical: 5,
        borderRadius: 50,
        position: 'absolute',
        right: 3,
        bottom: 3,
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    countBadgeText: {
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 'auto',
        color: 'black'
    }
});
