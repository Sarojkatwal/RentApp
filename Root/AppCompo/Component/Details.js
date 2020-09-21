import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper'
import Stuffdetail from '../Component/Comp/Omode/src/Screens/Stuffdetail'
import StuffdetailT from '../Component/Comp/Tmode/src/Screens/Stuffdetail'

export default class Details extends Component {
    render() {
        const { stuff, mode } = this.props.route.params
        return (
            <>
                <Appbar style={{
                    backgroundColor: 'green'
                }}>
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title="Title" />
                    <Appbar.Action icon="dots-vertical" />
                </Appbar>
                {mode == 'O' ?
                    <Stuffdetail stuff={stuff} {...this.props} />
                    :
                    <StuffdetailT stuff={stuff} {...this.props} />
                }
            </>
        );
    }
}

