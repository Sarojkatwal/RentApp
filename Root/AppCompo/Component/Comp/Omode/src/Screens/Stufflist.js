import React, { Component } from "react";
import { View, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { FAB, Banner } from 'react-native-paper'
import Stufflistitem from '../components/Stufflistitem';
import Stuffdetail from './Stuffdetail'
import { fetchRoomforloggedInUser } from '../../../../../../Firebase/api'
import firebase from '../../../../../../Firebase/Firebase'

class Stufflist extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        stuff: []
    }
    componentDidMount = () => {
        this.updateStuff()
    }
    updateStuff = async () => {
        this.setState({
            stuff: []
        }, () => {
            const uid = firebase.auth().currentUser.uid
            fetchRoomforloggedInUser(uid, true, this.saveResult)
                .then((data) => {
                    //console.log(data)
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
        global.Show = false
        this.props.navigation.navigate('Details', { stuff, mode: 'O' });
    };
    renderItem = ({ item }) => (
        <Stufflistitem key={item.key} item={item} onPress={this.onListItemPress} />
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
        return (
            <>
                <FAB
                    style={styles.fab}
                    icon="plus"
                    animated={true}
                    onPress={() =>
                        this.props.navigation.navigate('Add')
                    }
                />
                <View style={styles.container}>

                    {this.state.stuff.length !== 0 ?
                        <FlatList
                            data={this.state.stuff}
                            renderItem={this.renderItem}
                            numColumns={1}
                            keyExtractor={(stuff, index) => `${stuff.key}${index}`}
                            refreshing={false}
                            onRefresh={this.updateStuff}
                        /> :
                        <ActivityIndicator size={30} />}
                </View>
            </>
        );
    }
}

export default Stufflist;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    fab: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        margin: 15,
        zIndex: 1
    }
});
