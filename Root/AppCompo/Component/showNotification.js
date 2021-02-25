import React, { Component } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Button, Switch, Appbar, Title, Caption } from 'react-native-paper';
import { fetchPostforloggedInUser } from '../../Firebase/api'
import firebase from '../../Firebase/Firebase'
import { getLikeNotifications } from '../../Firebase/notify'
import { create_matchingRoomNotifications } from '../../Firebase/notify'

const windowWidth = Dimensions.get('window').width;

export class Stufflistitem extends Component {
    render() {

        const { item, onPress } = this.props;
        const x = item.postType === "ownerPost" ? "room" : "post"
        const time = new Date(item.likedAt).toLocaleString()
        return (
            <View style={styles.stuff}>
                <TouchableOpacity
                    onPress={() => {
                        onPress(item);
                    }}>
                    <View >
                        <Caption style={styles.text}>
                            {`${item.likedBy} liked your ${x} ${item.likedPost} in ${time} `}
                        </Caption>
                    </View>
                </TouchableOpacity>
            </View >

        );
    }
}
export class Stufflistitem2 extends Component {
    render() {

        const { item, onPress } = this.props;
        // const x = item.postType === "ownerPost" ? "room" : "post"
        // const time = new Date(item.likedAt).toLocaleString()
        return (
            <View style={styles.stuff}>
                <TouchableOpacity
                    onPress={() => {
                        onPress(item);
                    }}>
                    <View >
                        <Caption style={styles.text}>
                            {/* {`${item.likedBy} liked your ${x} ${item.likedPost} in ${time} `} */}
                           The room you have searched is found.
                        </Caption>
                    </View>
                </TouchableOpacity>
            </View >

        );
    }
}

class showNotification extends Component {

    state = {
        like: true,
        likenoti: [],
        roomnoti: [],
        loaded: false,
    }
    componentDidMount() {
        const { navigation } = this.props;
        const uid = firebase.auth().currentUser.uid;
        getLikeNotifications(uid).then((notifications) => {
            notifications.forEach((notification) => {
                this.setState({
                    likenoti: [...this.state.likenoti, notification]
                })
            })
        })
        // create_matchingRoomNotifications("use id here").then((rooms) => {
        //     rooms.forEach((room) => {
        //         this.setState({
        //             ...this.state,
        //             roomnoti: [...this.roomnoti, room]
        //         })
        //     })

        // })
    }


    updateStuff = async () => {
        this.setState({
            stuff: [],
            loaded: false,
        }, () => {
            const uid = firebase.auth().currentUser.uid
            fetchPostforloggedInUser(uid, this.saveResult)
                .then((data) => {
                    this.setState({
                        ...this.state,
                        loaded: true
                    })
                })
        })
    };
    saveResult = (data) => {
        this.setState({
            ...this.state,
            stuff: [...this.state.stuff, data]
        })
    }
    onListItemPress = stuff => {
        //global.Show = false
        this.setState({
            ...this.state,
        }, () => this.props.navigation.navigate('Details', { stuff, mode: 'mpost' }))
    };
    renderItem = ({ item }) => (
        <Stufflistitem key={item.key} item={item} onPress={this.onListItemPress} />
    );
    renderItem2 = ({ item }) => (
        <Stufflistitem2 key={item.key} item={item} onPress={this.onListItemPress} />
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
                    <ScrollView>
                        <View style={styles.cntainer}>
                            {this.state.loaded ? <FlatList
                                data={this.state.likenoti}
                                renderItem={this.renderItem}
                                numColumns={1}
                                keyExtractor={(stuff, index) => `${stuff.key}${index}`}
                                refreshing={false}
                                onRefresh={this.updateStuff}
                            /> :
                                <ActivityIndicator size={30} />}
                        </View>
                    </ScrollView> :
                    <ScrollView>
                        <View style={styles.cntainer}>
                            {this.state.loaded ? <FlatList
                                data={this.state.roomnoti}
                                renderItem={this.renderItem2}
                                numColumns={1}
                                keyExtractor={(stuff, index) => `${stuff.key}${index}`}
                                refreshing={false}
                                onRefresh={this.updateStuff}
                            /> :
                                <ActivityIndicator size={30} />}
                        </View>
                    </ScrollView>
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
