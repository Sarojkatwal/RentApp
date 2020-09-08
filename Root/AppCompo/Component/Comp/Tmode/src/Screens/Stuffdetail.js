import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
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
    Modal
} from "react-native-paper";

class Stuffdetail extends Component {
    constructor(props) {
        super(props);
        global.Show = true
    }
    state = {
        a: 700,
        visible: false
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
    componentDidMount = () => {
        this.x = setInterval(this.visible, 100)
    }
    visible = () => {
        if (!this.props.navigation.isFocused() && this.props.navigation.canGoBack()) {
            clearInterval(this.x);
            //console.log(this.props.navigation.isFocused())
            //console.log(this.props.route)
            //this.props.navigation.goBack()
        }
    }
    componentWillUnmount = () => {
        clearInterval(this.x)
    }
    render() {
        const { stuff } = this.props.route.params;
        return (
            <>
                < ScrollView >
                    <Card>
                        <Avatar.Image size={50}
                            style={styles.profile}
                            source={require('../../../../../../../assets/messi.png')}
                            onPress={() => alert('')}
                        />
                        <Card.Cover source={{ uri: "https://picsum.photos/" + this.state.a }} style={styles.images} />
                        <Card.Title
                            title="Some Photos"
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
                                    <Caption>Rs5000</Caption>
                                </View>
                            </View>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Title>Type:</Title>
                                    <Caption>Single</Caption>
                                </View>
                            </View>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Title>Negotiable:</Title>
                                    <Caption>Yes</Caption>
                                </View>
                            </View>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Title>Location:</Title>
                                    <Caption>Bashundhara,Kathmandu</Caption>
                                </View>
                            </View>

                            <List.Accordion title="Description"
                                titleStyle={{
                                    fontSize: 20,
                                    left: -15,
                                    fontWeight: 'bold'
                                }}
                            >
                                <Text style={styles.textfordesc}>
                                    {stuff.description}
                                </Text>

                            </List.Accordion>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Button mode='contained'
                                    > Call</Button>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                </ScrollView >
            </>
        );
    }
}

export default Stuffdetail;
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
    }
});
