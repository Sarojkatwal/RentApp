import React, { Component } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
//import { SharedElement } from 'react-navigation-shared-element';


const windowWidth = Dimensions.get('window').width;
class Stufflistitem extends Component {
    render() {
        const { item, onPress } = this.props;
        return (
            <TouchableOpacity
                onPress={() => {
                    onPress(item);
                }}>
                <View style={styles.stuff}>
                    <Text style={styles.text}>1</Text>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        resizeMode="contain"
                    />

                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.text} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.text}>{`$ ${item.price}`}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default Stufflistitem;
const styles = StyleSheet.create({
    image: {
        width: windowWidth / 2 - 30,
        height: 140,
    },
    text: {
        margin: 3,
        textAlign: 'center',
    },
    stuff: {
        //flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth / 2,
        margin: 2,
    },
});
