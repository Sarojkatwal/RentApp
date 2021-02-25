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
import { getRoomimg } from '../../../../../../Firebase/api'
import { getPpandPhoneno } from '../../../../../../Firebase/api'

const windowWidth = Dimensions.get('window').width;
class Stufflistitem extends Component {
    state = {
        clicked: false,
        roomimg: [],
        userinfo: {}
    }
    componentDidMount = async () => {
        const x = await getRoomimg("ownerPost", this.props.item.roomInformation.__name__)
        this.setState({
            ...this.state,
            roomimg: x
        })
        const y = await getPpandPhoneno(this.props.item.roomInformation.authorId)
        this.setState({
            ...this.state,
            userinfo: y
        })
    }
    render() {

        const { item, onPress, recomm } = this.props;
        return (
            <View style={styles.stuff}>

                <TouchableOpacity
                    onPress={() => {
                        //onPress(item);
                        const m = { ...item, roomInformation: item.roomInformation, userinfo: this.state.userinfo, roominfo: this.state.roomimg }
                        onPress(m)
                    }}>
                    <Image
                        source={{ uri: this.state.roomimg[0] }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View >
                        <Text style={styles.text} numberOfLines={1}>{item.roomInformation.roomData.location.name}</Text>
                        <Text style={styles.text}>{`Rs ${item.roomInformation.roomData.price}`}</Text>
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

                <TouchableOpacity onPress={() => this.props.navigation.navigate('ShowProfile', { userdata: this.state.userinfo })}
                    style={{ position: 'absolute', bottom: 0, right: 4, zIndex: 1 }}>
                    <Avatar.Image size={70}
                        source={{ uri: this.state.userinfo.profilePic }}
                    />
                </TouchableOpacity>
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
        zIndex: 1,
        right: 0,
        bottom: 2,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 2
    },
});
