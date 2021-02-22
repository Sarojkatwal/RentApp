import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, Picker } from 'react-native';
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
    Avatar,
    List,
    Provider,
    Portal,
    Modal,
    TextInput
} from "react-native-paper";

class Editdetails extends Component {
    state = {
        a: 700,
        visible: false,
        rated: false,
        rating: 0,
        roomtype: 1,
        price: 4000,
        negotiable: 1,
        location: 'Bashundhara,Kathmand',
        description: ""
    }
    handleclick = (x) => {
        x ? (this.state.a != 700 &&
            this.setState({
                a: this.state.a - 1
            })
        )
            :
            (this.state.a != 705 &&
                this.setState({
                    a: this.state.a + 1
                })
            )
    }
    render() {
        return (
            <>
                < ScrollView >
                    <Card>
                        <Card.Cover source={{ uri: "https://picsum.photos/" + this.state.a }} style={styles.images} />
                        <Card.Title
                            title="Some hotos"
                            subtitle={`PhotoNo ${this.state.a}`}
                            titleStyle={{
                                alignSelf: 'center'
                            }}
                            subtitleStyle={{
                                alignSelf: 'center'
                            }}
                            left={(props) =>
                                <IconButton {...props} size={40} color={this.state.a == 700 ? 'grey' : 'white'} icon="skip-previous-circle"
                                    style={{
                                        top: -60,
                                        left: -20,
                                    }
                                    }
                                    onPress={() => this.handleclick(true)}
                                />}
                            right={(props) =>
                                <IconButton {...props} size={40} color={this.state.a == 705 ? 'grey' : 'white'} icon="skip-next-circle"
                                    style={{
                                        top: -60,
                                        right: -5
                                    }
                                    }
                                    onPress={() => this.handleclick(false)}
                                />}
                        />
                        <Divider />
                        <Card.Content>

                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Title>Price:</Title>
                                    <TextInput
                                        style={styles.textInput}
                                        mode="outlined"
                                        keyboardType='numeric'
                                        //label={this.state.price}
                                        onChangeText={(price) => this.setState({ price })}
                                        value={`${this.state.price}`}
                                        maxLength={10}  //setting limit of input
                                    />
                                </View>
                            </View>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Title>Type:</Title>
                                    <Picker style={styles.pickerStyle}
                                        mode='dropdown'
                                        selectedValue={this.state.roomtype}
                                        onValueChange={(itemValue, itemPosition) =>
                                            this.setState({ roomtype: itemValue })}
                                    >
                                        <Picker.Item label="Single" value={1} />
                                        <Picker.Item label="Double" value={2} />
                                        <Picker.Item label="Flat" value={3} />
                                    </Picker>
                                </View>
                            </View>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Title>Negotiable:</Title>
                                    <Picker style={styles.pickerStyle}
                                        mode='dropdown'
                                        selectedValue={this.state.negotiable}
                                        onValueChange={(itemValue, itemPosition) =>
                                            this.setState({ negotiable: itemValue })}
                                    >
                                        <Picker.Item label="Yes" value={1} />
                                        <Picker.Item label="No" value={2} />
                                    </Picker>
                                </View>
                            </View>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Title>Location:</Title>
                                    <Caption>Bashundhara,athmandu</Caption>
                                </View>
                            </View>
                            <List.Accordion title="Description"
                                titleStyle={{
                                    fontSize: 20,
                                    left: -15,
                                    fontWeight: 'bold'
                                }}
                            >
                                <TextInput
                                    onChangeText={(description) => this.setState({ description })}
                                    value={this.state.description}
                                    multiline={true}
                                    numberOfLines={5}
                                />
                            </List.Accordion>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Button mode='contained'
                                    > Done</Button>
                                    <Button mode='contained'
                                    > Delete</Button>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                </ScrollView >
            </>
        );
    }
}

export default Editdetails;
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    profile: {
        position: 'absolute',
        zIndex: 1,
        right: 0,
        bottom: 0,
        margin: 10,
        backgroundColor: 'transparent',
        borderColor: 'grey',
        borderWidth: 1
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
    },
    pickerStyle: {

        width: "50%",
        color: '#344953',
    },
    textInput: {
        height: 40,
        width: "50%",
    }
});
