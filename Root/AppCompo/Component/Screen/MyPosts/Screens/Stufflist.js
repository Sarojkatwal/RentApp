import React, { Component } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Stufflistitem from '../components/Stufflistitem';
import { fetchPostforloggedInUser } from '../../../../../Firebase/api'
import firebase from '../../../../../Firebase/Firebase'

class Stufflist extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        stuff: [],
        loaded: false,
        refresh: true,
    }

    componentDidMount() {
        const { navigation } = this.props;
        //this.updateStuff()
        this.focusListener = navigation.addListener("focus", () => {
            if (this.state.refresh) {
                this.updateStuff()
            }
        });
    }
    componentWillUnmount() {
        this.focusListener();
    }

    doRefresh = (data) => {
        this.setState({
            ...this.state,
            refresh: data
        })
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
            refresh: false
        }, () => this.props.navigation.navigate('Details', { stuff, mode: 'mpost', doRefresh: this.doRefresh }))
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
                {this.state.loaded ? <FlatList
                    data={this.state.stuff}
                    renderItem={this.renderItem}
                    numColumns={1}
                    keyExtractor={(stuff, index) => `${stuff.key}${index}`}
                    refreshing={false}
                    onRefresh={this.updateStuff}
                /> :
                    <ActivityIndicator size={30} />}
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
