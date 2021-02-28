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
import { getPpandPhoneno } from '../../../../../../Firebase/api'
import firebase from '../../../../../../Firebase/Firebase'
import { save_likeNotifications } from '../../../../../../Firebase/notify'
import { isViewed, makeViewed } from '../../../../../../Firebase/isViewed'

const windowWidth = Dimensions.get('window').width;
class Stufflistitem extends Component {
    state = {
        clicked: this.props.likedPost.includes(this.props.item.roomInformation.__name__),
        userinfo: {},
        viewed: false
    }
    componentDidMount = async () => {
        const uid = firebase.auth().currentUser.uid;
        const pid = this.props.item.roomInformation.__name__;
        //console.log("Props=", this.props.likedPost.includes(this.props.item.roomInformation.__name__))
        const y = await getPpandPhoneno(this.props.item.roomInformation.authorId)
        const z = await isViewed(pid, uid, false)
       // console.log("z=", z)
        this.setState({
            ...this.state,
            userinfo: y,
            viewed: z
        })
    }
    saveNoti = () => {
        const uid = firebase.auth().currentUser.uid;
        const pid = this.props.item.roomInformation.__name__;
        save_likeNotifications(uid, pid, true, this.state.clicked)
    }
    render() {
        const { item, onPress } = this.props;
        return (
            <View style={styles.stuff}>
                <TouchableOpacity
                    onPress={() => {
                        const uid = firebase.auth().currentUser.uid;
                        const pid = this.props.item.roomInformation.__name__;
                        if (!this.state.viewed) {
                            makeViewed(pid, uid, false)
                        }
                        const m = {
                            ...item, roomInformation: item.roomInformation,
                            userinfo: this.state.userinfo
                        }
                        onPress(m);
                    }}>
                    <Image
                        source={{ uri: this.state.userinfo.profilePic }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <View >
                        <Text style={styles.text} numberOfLines={1}>{item.roomInformation.roomData.location.name}</Text>
                        <Text style={styles.text}>{`Rs. ${item.roomInformation.roomData.price}`}</Text>
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
                <Badge style={styles.reco}> Posts</Badge>

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
        backgroundColor: 'purple'
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
