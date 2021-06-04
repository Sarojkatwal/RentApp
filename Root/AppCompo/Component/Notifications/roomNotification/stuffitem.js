import React, { Component } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Text, Dimensions, SafeAreaView } from 'react-native';
import { Button, Switch, Avatar, Title, Caption } from 'react-native-paper';
import { getPpandPhoneno } from '../../../../Firebase/api'
import firebase from '../../../../Firebase/Firebase'
import { fetchGivenPost } from '../../../../Firebase/api'

const windowWidth = Dimensions.get('window').width;
export default class Stufflistitem extends Component {
    state = {
        user: {},
        por: {},
        loaded: false
    }
    componentDidMount = async () => {
        const uid = this.props.item.postOf
        const puid = this.props.item.postId

        // console.log(uid)


        if (this.props.item.postType === "tenantPost") {
            fetchGivenPost("tenantPost", puid, this.saveRoom);
        }
        else if (this.props.item.postType === "ownerPost") {
            fetchGivenPost("ownerPost", puid, this.saveRoom);
        }

        const x = await getPpandPhoneno(uid.toLocaleString());

        this.setState({
            ...this.state,
            user: x,
            loaded: true
        })
    }
    saveRoom = (y) => {
        this.setState({
            ...this.state,
            por: y
        })
    }
    render() {
        const { item, onPress } = this.props;
        const x = item.postType === "ownerPost" ? true : false
        const time = new Date(item.savedAt).toLocaleString()
        return (
            <View style={styles.stuff}>
                <TouchableOpacity
                    onPress={() => {
                        const m = { item: this.props.item, ...this.state }
                        // console.log(m)
                        onPress(m);
                    }}>
                    {this.state.loaded &&
                        <View >
                            <Avatar.Image style={styles.comb} source={{ uri: this.state.user.profilePic }} />
                            <Caption style={styles.text}>
                                {x?`${this.state.user.username} requested you to check his room on ${time} `:
                                `${this.state.user.username} requested for your room on ${time}`}
                            </Caption>
                        </View>
                    }
                </TouchableOpacity>
            </View >

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        margin: 30,
        textAlign: 'left',
        fontSize: 15
    },
    comb: {
        alignSelf: 'center',
        marginTop: 2
    },
    stuff: {
        borderColor: 'pink',
        borderRadius: 20,
        backgroundColor: 'grey',
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: windowWidth - 10,
        margin: 6,
    },
    titles: {
        flex: 1,
        margin: 20
    },
    ok: {
        margin: 30
    }
});