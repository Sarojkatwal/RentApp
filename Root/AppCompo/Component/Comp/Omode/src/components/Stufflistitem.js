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
        const { item, onPress } = this.props;
        return (
            <View style={styles.stuff}>
                <TouchableOpacity
                    onPress={() => {
                        onPress(item);
                    }}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View >
                        <Text style={styles.text} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.text}>{`$ ${item.price}`}</Text>
                    </View>
                </TouchableOpacity>
                <Badge style={styles.reco}>My Rooms</Badge>
                <Avatar.Image size={70}
                    style={styles.profile}
                    source={require('../../../../../../../assets/messi.png')}
                    onPress={() => alert('')}
                />
            </View >

        );
    }
}

export default Stufflistitem;
const styles = StyleSheet.create({
    image: {
        width: windowWidth,
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
        right: 15,
        bottom: 42,
        margin: 10,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 2
    },
});
