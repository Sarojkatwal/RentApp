import React, { Component } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Feather from "react-native-vector-icons/Feather";
import { Badge, IconButton, Avatar } from 'react-native-paper'

const windowWidth = Dimensions.get('window').width;
class Stufflistitem extends Component {
    render() {
        const { item, onPress } = this.props;
        return (
            <View style={styles.stuff}>
                <TouchableOpacity
                    onPress={() => {
                        onPress(item);
                    }}>
                    <View >
                        <Text style={styles.text} numberOfLines={1}>{`${item.sn}.   ${item.roomData.location.name}`}</Text>
                    </View>
                </TouchableOpacity>
            </View >

        );
    }
}

export default Stufflistitem;
const styles = StyleSheet.create({
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
    heart: {
        position: 'absolute',
    },
    reco: {
        position: 'absolute',
        top: 0,
        left: 2,
    },

});
