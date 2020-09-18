import React, { Component } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,

    View,
    TouchableOpacity,
} from 'react-native';
import { Badge, IconButton, Avatar } from 'react-native-paper'

const windowWidth = Dimensions.get('window').width;
class Stufflistitem extends Component {
    state = {
        clicked: false
    }
    render() {
        const { item, onPress, recomm } = this.props;
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
                <IconButton icon={!this.state.clicked ? "heart-outline" : "cards-heart"}
                    color={!this.state.clicked ? "red" : "red"}
                    size={50}
                    animated={true}
                    onPress={() => this.setState({
                        clicked: !this.state.clicked
                    })}
                    style={styles.heart}
                />
                {recomm && <Badge style={styles.reco}>Recommended</Badge>}
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
        right: 0,
        bottom: 2,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 2
    },
});
