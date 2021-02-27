
import React, { Component } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Text, Dimensions, SafeAreaView } from 'react-native';
import { Button, Switch, Appbar, Title, Caption } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
export default class Stufflistitem2 extends Component {
    render() {

        const { item, onPress } = this.props;
        // const x = item.postType === "ownerPost" ? "room" : "post"
        // const time = new Date(item.likedAt).toLocaleString()
        return (
            <View style={styles.stuff}>
                <TouchableOpacity
                    onPress={() => {
                        onPress(item);
                    }}>
                    <View >
                        <Caption style={styles.text}>
                            {/* {`${item.likedBy} liked your ${x} ${item.likedPost} in ${time} `} */}
                           The room you have searched is found.
                        </Caption>
                    </View>
                </TouchableOpacity>
            </View >

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        margin: 30,
        textAlign: 'left',
        fontSize: 15
    },
    stuff: {
        borderColor: 'pink',
        borderRadius: 20,
        backgroundColor: 'grey',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: windowWidth - 10,
        margin: 6,
    },
    titles: {
        flex: 1,
        margin: 20
    },
    ok: {
        margin: 30
    }
});