import React, { Component } from "react";
import { View, FlatList, StyleSheet, Button } from 'react-native';
import { getStuff } from '../api';
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
            <View style={styles.container}>
                <Button title='Add Rooms'
                    onPress={() => this.props.navigation.navigate('Add')} />
                <FlatList
                    data={this.state.stuff}
                    renderItem={this.renderItem}
                    numColumns={1}
                    keyExtractor={(stuff, index) => `${stuff.key}${index}`}
                    refreshing={false}
                    onRefresh={this.updateStuff}
                />
            </View>
        );
    }
}

export default Stufflist;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
});
