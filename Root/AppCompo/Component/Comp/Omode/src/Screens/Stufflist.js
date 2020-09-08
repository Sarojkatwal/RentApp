import React, { Component } from "react";
import { View, FlatList, StyleSheet, Button } from 'react-native';
import { getStuff } from '../api';
import Stufflistitem from '../components/Stufflistitem';

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
    updateStuff = () => {
        this.setState({
            stuff: getStuff()
        });
    };
    onListItemPress = stuff => {
        global.Show = false
        this.props.navigation.navigate('stuffdetail', { stuff });
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
