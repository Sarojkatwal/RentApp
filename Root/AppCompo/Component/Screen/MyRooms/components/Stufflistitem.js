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
    state = {
        clicked: false
    }
    componentDidMount = () => console.log()
    render() {
        const { item, onPress, udata } = this.props;
        return (
            <View style={styles.stuff}>
                <TouchableOpacity
                    onPress={() => {
                        onPress(item);
                    }}>
                    <Image
                        source={{ uri: item.roomimg[0] }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View >
                        <Text style={styles.text} numberOfLines={1}>{item.roomData.location.name}</Text>
                        <Text style={styles.text}>{`Rs. ${item.roomData.price}`}</Text>
                    </View>
                </TouchableOpacity>
                <Badge style={styles.reco}>My Rooms</Badge>
                {udata.profilePic !== '' &&
                    <Avatar.Image size={70}
                        style={styles.profile}
                        source={{ uri: udata.profilePic }}
                    />}
            </View >

        );
    }
}

export default Stufflistitem;
const styles = StyleSheet.create({
    image: {
        width: windowWidth / 1.25,
        height: 240,
        borderRadius: 30,
        marginTop: 20
    },
    text: {
        margin: 3,
        textAlign: 'center',
    },
    stuff: {
        borderColor: 'pink',
        borderRadius: 20,
        backgroundColor: 'grey',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth - 10,
        margin: 4,
    },
    heart: {
        position: 'absolute',
    },
    reco: {
        position: 'absolute',
        top: 0,
        left: 2,
    },
    profile: {
        position: 'absolute',
        zIndex: 1,
        right: 5,
        bottom: 2,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 2
    },
});
