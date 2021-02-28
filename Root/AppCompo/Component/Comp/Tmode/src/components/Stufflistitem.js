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
import firebase from '../../../../../../Firebase/Firebase'
import { save_likeNotifications } from '../../../../../../Firebase/notify'
import { isViewed, makeViewed } from '../../../../../../Firebase/isViewed'
import { sum_priority } from '../../../../../../Firebase/priority'

const windowWidth = Dimensions.get('window').width;
class Stufflistitem extends Component {
    state = {
        clicked: this.props.likedPost.includes(this.props.item.roomInformation.__name__),
        roomimg: [],
        userinfo: {},
        viewed: false
    }
    componentDidMount = async () => {
        const uid = firebase.auth().currentUser.uid;
        const pid = this.props.item.roomInformation.__name__;
        const x = await getRoomimg("ownerPost", this.props.item.roomInformation.__name__)
        this.setState({
            ...this.state,
            roomimg: x
        })
        const y = await getPpandPhoneno(this.props.item.roomInformation.authorId)
        const z = await isViewed(pid, uid, true)
        this.setState({
            ...this.state,
            userinfo: y,
            viewed: z
        })
    }

    saveNoti = () => {
        const uid = firebase.auth().currentUser.uid;
        const pid = this.props.item.roomInformation.__name__;
        save_likeNotifications(uid, pid, false, this.state.clicked)
    }
    render() {

        const { item, onPress, recomm } = this.props;
        // console.log("Room=", this.props.item)
        const p = sum_priority(this.props.item.ratings)
        var txt = "";
        if (p >= 9.5) {
            txt = "Highly Recommended"
        }
        else if (p >= 8) {
            txt = "Recommended"
        }
        else {
            txt = "You may like"
        }
        return (
            <View style={styles.stuff}>

                <TouchableOpacity
                    onPress={() => {
                        //onPress(item);
                        const uid = firebase.auth().currentUser.uid;
                        const pid = this.props.item.roomInformation.__name__;
                        if (!this.state.viewed) {
                            makeViewed(pid, uid, true)
                        }
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
                    }, this.saveNoti)}
                    style={styles.heart}
                />
                {recomm && <Badge style={styles.reco}>{txt}</Badge>}

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
