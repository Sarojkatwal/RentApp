import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import StarRating from 'react-native-star-rating';
import {
    Card,
    Title,
    IconButton,
    Paragraph,
    Headline,
    Subheading,
    Caption,
    Button,
    Divider,
    Switch,
    List,
    Badge,
    Portal,
    Modal
} from "react-native-paper";
import ShowProfile from '../../showProfile'
import StuffdetailP from '../../../Component/Comp/Omode/src/Screens/Stuffdetail'
import StuffdetailR from '../../../Component/Comp/Tmode/src/Screens/Stuffdetail'

class Stuffdetail extends Component {
    state = {
        switchon: false
    }
    render() {
       // console.log(this.props.stuff.por)
        const { stuff } = this.props;
        const posttype = (this.props.stuff.item.postType == "ownerPost") ? "Room" : "Post"
        const txt = !this.state.switchon ? "Requested By" : "Requested " + posttype
        return (
            <>
                <View >
                    <View style={styles.head}>
                        <Badge size={40}>{txt}</Badge>
                    </View>
                    <View style={styles.switch}>
                        <Switch value={this.state.switchon} onValueChange={() => {
                            this.setState({
                                ...this.state,
                                switchon: !this.state.switchon
                            })
                        }} />
                    </View>
                </View>
                {!this.state.switchon ? <ShowProfile userdata={this.props.stuff.user} {...this.props} /> :
                    ((this.props.stuff.item.postType == "ownerPost") ?
                        <StuffdetailR  {...this.props} stuff={{roomInformation:this.props.stuff.por,roominfo:this.props.stuff.por.roomimg,
                            ratings:{distance:0},matchedTo:"",from:"noti"}} /> :
                        <StuffdetailP  {...this.props} stuff={{roomInformation:this.props.stuff.por,userinfo:this.props.stuff.user,roominfo:this.props.stuff.por.roomimg,
                            ratings:{distance:0},matchedTo:"",from:"noti"
                        }} />
                    )}
            </>
        );
    }
}

export default Stuffdetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        marginVertical: 5,
        marginHorizontal: 5,
        flexDirection: 'row',

    },
    switch: {
        position: 'absolute',
        top: 5,
        right: 0
    },
    images: {
        marginTop: 1,
        height: 273,
        width: '100%',
    },
    textfordesc: {
        margin: 12,
        fontSize: 16,
    },
    description: {
        margin: 10,
    },
    a1: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    a2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    }
});
