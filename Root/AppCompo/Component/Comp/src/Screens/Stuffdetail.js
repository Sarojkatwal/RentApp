import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
//import { SharedElement } from 'react-navigation-shared-element';
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
    List
} from "react-native-paper";

class Stuffdetail extends Component {
    constructor(props) {
        super(props);
        global.Show = true
    }
    state = {
        a: 700
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
            console.log(this.props.navigation.isFocused())
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
                {/* <ScrollView>
                <View style={styles.titleWrap}>

                    <Text style={styles.text}>{stuff.name}</Text>


                    <Text style={styles.text}>{`$ ${stuff.price}`}</Text>

                </View>

                <Image
                    source={{ uri: stuff.image }}
                    resizeMode="contain"
                    style={styles.image}
                />

                <Text style={styles.description}>{stuff.description}</Text>
           </ScrollView>*/}
                < ScrollView >
                    <Card>
                        <Card.Cover source={{ uri: "https://picsum.photos/" + this.state.a }} />
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
                            <Title>Price: 5000</Title>
                            <Title>Type: Single </Title>
                            <Title>Negotiable: No</Title>
                            <Title>Location: Bashundhara</Title>

                            <List.Accordion title="Description"
                                titleStyle={{
                                    fontSize: 30,
                                    left: -20
                                }}
                                left={() => <IconButton icon='account-details' style={{ left: -20 }} />}
                            >
                                <Headline>
                                    {stuff.description}
                                </Headline>

                            </List.Accordion>
                            <View style={styles.a1}>
                                <View style={styles.a2}>
                                    <Button mode='contained'>Call</Button>
                                    <Button mode='contained'>Comment</Button>
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
    image: {
        height: 273,
        width: '100%',
        marginTop: 5
    },
    text: {
        marginTop: 2,
        textAlign: 'center',
        fontSize: 26,
    },
    titleWrap: {
        margin: 10,
        flex: 1,
        alignItems: 'center'
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
