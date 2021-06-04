import React, { Component } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Text, Dimensions, SafeAreaView } from 'react-native';
import { Button, Switch, Appbar, Title, Caption } from 'react-native-paper';
import { fetchPostforloggedInUser } from '../../Firebase/api'
import firebase from '../../Firebase/Firebase'
import { getLikeNotifications,getMatchingNotifications } from '../../Firebase/notify'

import Stufflistitem from './Notifications/likeNotification/stuffitem'
import Stufflistitem2 from './Notifications/roomNotification/stuffitem'

const windowWidth = Dimensions.get('window').width;

class showNotification extends Component {

    state = {
        like: true,
        likenoti: [],
        roomnoti: [],
        loaded1: false,
        loaded2:false
    }
    componentDidMount() {
        this.updateStuff()
    }
    updateStuff = async () => {
        const { navigation } = this.props;
        const uid = firebase.auth().currentUser.uid;
        this.setState({
            like: true,
            likenoti: [],
            roomnoti: [],
            loaded1: false
            
        })
        getLikeNotifications(uid).then((notifications) => {
            if (notifications.length === 0) {
                this.setState({
                    ...this.state,
                    loaded1: true
                })
            }
            else {
                notifications.forEach((notification) => {
                   // console.log(notification)
                    this.setState({
                        likenoti: [...this.state.likenoti, notification],
                        loaded1: true
                    })
                })
            }
        })
        getMatchingNotifications(uid).then((notifications)=>
        {
          
            if (notifications.length === 0) {
                this.setState({
                    ...this.state,
                    loaded2: true
                })
            }
            else {
                notifications.forEach((notification) => {
                    
                    this.setState({
                        roomnoti: [...this.state.roomnoti, notification],
                        loaded2: true
                    })
                })
            }
            
        })
        // create_matchingRoomNotifications("use id here").then((rooms) => {
        //     rooms.forEach((room) => {
        //         this.setState({
        //             ...this.state,
        //             roomnoti: [...this.roomnoti, room]
        //         })
        //     })

        // })
    };
    saveResult = (data) => {
        this.setState({
            ...this.state,
            stuff: [...this.state.stuff, data]
        })
    }
    onListItemPress1 = stuff => {
        this.setState({
            ...this.state,
        }, () => this.props.navigation.navigate('Details', { stuff, mode: "likenoti" }))
    };
    onListItemPress2 = stuff => {
        this.setState({
            ...this.state,
        }, () => this.props.navigation.navigate('Details', { stuff, mode: "roomnoti" }))
    };
    renderItem = ({ item }) => (
        <Stufflistitem key={item.key} item={item} onPress={this.onListItemPress1} />
    );
    renderItem2 = ({ item }) => (
        <Stufflistitem2 key={item.key} item={item} onPress={this.onListItemPress2} />
    );
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "blue",
                }}
            />
        );
    };
    render() {
        //  console.log(this.state.stuff.length)
        const text = this.state.like ? "Like Notifications" : "Room Notifications "
        return (
            <>
                <Appbar style={{
                    backgroundColor: 'green'
                }}>
                    <Appbar.BackAction onPress={() => {
                        this.props.navigation.goBack()
                    }} />
                    <Appbar.Content title={text} />
                    <Switch value={!this.state.like} onValueChange={() => this.setState({
                        like: !this.state.like
                    })} />
                </Appbar>

                {this.state.like ?
                    <SafeAreaView style={{ marginBottom: 50 }}>
                        <View style={styles.cntainer}>
                            {this.state.loaded1 ? <FlatList
                                data={this.state.likenoti}
                                renderItem={this.renderItem}
                                numColumns={1}
                                keyExtractor={(stuff, index) => `${stuff.key}${index}`}
                                refreshing={false}
                                onRefresh={this.updateStuff}
                            /> :
                                <ActivityIndicator size={30} />}
                        </View>
                    </SafeAreaView> :
                    <SafeAreaView style={{ marginBottom: 50 }}>
                        <View style={styles.cntainer}>
                            {this.state.loaded2 ? <FlatList
                                data={this.state.roomnoti}
                                renderItem={this.renderItem2}
                                numColumns={1}
                                keyExtractor={(stuff, index) => `${stuff.key}${index}`}
                                refreshing={false}
                                onRefresh={this.updateStuff}
                            /> :
                                <ActivityIndicator size={30} />}
                        </View>
                    </SafeAreaView>
                }
            </>
        );
    }
}

export default showNotification;

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
