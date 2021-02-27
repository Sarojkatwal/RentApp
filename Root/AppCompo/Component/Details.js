import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper'
import Stuffdetail from '../Component/Comp/Omode/src/Screens/Stuffdetail'
import StuffdetailT from '../Component/Comp/Tmode/src/Screens/Stuffdetail'
import StuffdetailP from '../Component/Screen/MyPosts/Screens/Stuffdetail'
import StuffdetailR from '../Component/Screen/MyRooms/Screens/Stuffdetail'
import StuffdetalLikenoti from '../Component/Notifications/likeNotification/stuffdetail'
import StuffdetailRoomnoti from '../Component/Notifications/roomNotification/stuffdetail'
export default class Details extends Component {
    render() {
        const { stuff, mode } = this.props.route.params
        // console.log(stuff)
        return (
            <>
                <Appbar style={{
                    backgroundColor: 'green'
                }}>
                    <Appbar.BackAction onPress={() => {
                        this.props.navigation.goBack()
                    }} />
                    <Appbar.Content title="Details" />
                </Appbar>
                {mode == 'O' ?
                    <Stuffdetail stuff={stuff} {...this.props} />
                    :
                    (mode === "mpost" ? <StuffdetailP stuff={stuff} {...this.props} /> : (mode === "mroom" ?
                        <StuffdetailR stuff={stuff} {...this.props} /> :
                        (mode === "roomnoti" ? <StuffdetailRoomnoti stuff={stuff} {...this.props} /> :
                            (mode === "likenoti" ? <StuffdetalLikenoti stuff={stuff} {...this.props} /> :
                                <StuffdetailT stuff={stuff} {...this.props} />))
                    ))
                }
            </>
        );
    }
}

