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
import { IconButton } from 'react-native-paper'

const windowWidth = Dimensions.get('window').width;
class Stufflistitem extends Component {
    state = {
        clicked: false
    }
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
                <IconButton icon={!this.state.clicked ? "heart-outline" : "cards-heart"}
                    color={!this.state.clicked ? "red" : "red"}
                    size={50}
                    animated={true}
                    onPress={() => this.setState({
                        clicked: !this.state.clicked
                    })}
                    style={styles.heart}
                />

            </View >

        );
    }
}

export default Stufflistitem;
const styles = StyleSheet.create({
    image: {
        width: windowWidth / 2 - 50,
        height: 140,
        borderRadius: 20,
    },
    text: {
        margin: 3,
        //textAlign: 'center',
    },
    stuff: {
        borderColor: 'pink',
        borderRadius: 20,
        backgroundColor: 'grey',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth / 2 - 4,
        margin: 2,
    },
    heart: {
        position: 'absolute',
    }
});